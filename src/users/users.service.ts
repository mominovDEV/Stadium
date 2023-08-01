import { FindUserDto } from './dto/find-user.dto';
import { LoginUserDto } from './dto/login.userdto';
// import { UsersService } from './users.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import {
  BadGatewayException,
  ForbiddenException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/sequelize';
import { response, Response } from 'express';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt/dist';
import { Op } from 'sequelize';
import { MailModule } from '../mail/mail.module';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private readonly userRepo: typeof User,
    private readonly jwtService: JwtService,
    private readonly mailService: MailService,
  ) {}
  async registration(createUserDto: CreateUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { username: createUserDto.username },
    });

    if (user) {
      throw new BadGatewayException('Username already exists!');
    }
    if (createUserDto.password !== createUserDto.confirm_password) {
      throw new BadGatewayException('Password not match!');
    }

    const hashed_password = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userRepo.create({
      ...createUserDto,
      hashed_password: hashed_password,
    });
    const tokens = await this.getTokens(newUser);

    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);
    const uniqueKey: string = uuidv4();
    const updateUser = await this.userRepo.update(
      {
        hashed_refresh_token: hashed_refresh_token,
        activation_link: uniqueKey,
      },
      { where: { id: newUser.id }, returning: true },
    );
    res.cookie('refresh_token', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    try {
      await this.mailService.sendUserConfirmation(updateUser[1][0]);
    } catch (error) {
      console.log(error);
    }

    const response = {
      message: 'User registired',
      user: updateUser[1][0],
      tokens: tokens,
    };
    return response;
  }

  async getTokens(user: User) {
    const jwtPayload = {
      id: user.id,
      is_active: user.is_active,
      is_owner: user.is_owner,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN_KEY,
        expiresIn: process.env.ACCESS_TOKEN_TIME,
      }),
    ]);
    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }

  async login(loginUserDto: LoginUserDto, res: Response) {
    const user = await this.userRepo.findOne({
      where: { email: loginUserDto.email },
    });
    if (!user) {
      throw new BadRequestException('user does not exist');
    }
    if (!bcrypt.compareSync(loginUserDto.password, user.hashed_password)) {
      throw new BadRequestException('password did not match');
    }

    const tokens = await this.getTokens(user);
    const hashed_refresh_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    // try {
    //   await this.mailService.sendUserConfirmation(updatedUser[1][0]);
    // } catch (error) {
    //   console.log(error);
    // }

    return {
      message: 'user logged in',
      user: updatedUser[1][0],
      tokens,
    };
  }

  async logout(refreshToken: string, res: Response) {
    const userData = await this.jwtService.verify(refreshToken, {
      secret: process.env.REFRESH_TOKEN_KEY,
    });
    if (!userData) {
      throw new BadRequestException('usernpt foud');
    }
    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: null },
      { where: { id: userData.id }, returning: true },
    );

    res.clearCookie('refresh_token');
    const response = {
      message: 'User logged out successfully',
      user: updatedUser[1][0],
    };

    return response;
  }

  async refreshToken(user_id: number, refreshToken: string, res: Response) {
    const decodedToken = this.jwtService.decode(refreshToken);
    if (user_id != decodedToken['id']) {
      throw new BadRequestException('user not foud');
    }
    const user = await this.userRepo.findOne({ where: { id: user_id } });
    if (!user || !user.hashed_refresh_token) {
      throw new BadRequestException('usernpt foud');
    }

    const tokenMatch = await bcrypt.compare(
      refreshToken,
      user.hashed_refresh_token,
    );
    if (!tokenMatch) {
      throw new ForbiddenException('forbidden');
    }
    const tokens = await this.getTokens(user);
    const hashed_password_token = await bcrypt.hash(tokens.refreshToken, 7);

    const updatedUser = await this.userRepo.update(
      { hashed_refresh_token: hashed_password_token },
      { where: { id: user.id }, returning: true },
    );

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 15 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    const response = {
      message: 'User refreshed',
      user: updatedUser[1][0],
      tokens,
    };

    return response;
  }

  // findAll() {
  //   return `This action returns all users`;
  // }

  async findAll(findUserDto: FindUserDto) {
    const where = {};
    if (findUserDto.first_name) {
      where['first_name'] = {
        [Op.like]: `%${findUserDto.first_name}%`,
      };
    }
    if (findUserDto.last_name) {
      where['last_name'] = {
        [Op.like]: `%${findUserDto.last_name}%`,
      };
    }

    if (findUserDto.birthday_begin) {
      where[Op.and] = {
        birthday: {
          [Op.between]: [findUserDto.birthday_begin, findUserDto.birthday_end],
        },
      };
    } else if (findUserDto.birthday_begin) {
      where['birthday_begin'] = { [Op.gte]: findUserDto.birthday_begin };
    } else if (findUserDto.birthday_end) {
      where['birthday_end'] = { [Op.lte]: findUserDto.birthday_end };
    }

    const users = await User.findAll({ where });
    if (!User) {
      throw new BadRequestException('user not fo');
    }
    return users;
  }

  // @ApiOperation({ summary: "Booking qo'shish" })
  // @ApiResponse({ status: 201, type: Booking })
  // @UseGuards(adminGuard)
  // @Post()
  // create(@Body() createuserDto: CreateUserDto) {
  //   return this.usersService.registration(createuserDto);
  // }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
