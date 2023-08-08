import { VeifyOtpDto } from './dto/verifyOtp.dto';
import { PhoneUserDto } from './dto/phone-user.dto';
import { UserGuard } from './../guards/user.guard';
import { FindUserDto } from './dto/find-user.dto';
import { CookieGetter } from './../decorators/cookieGetter.decorators';
import { LoginUserDto } from './dto/login.userdto';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './models/user.model';
import { HttpCode, Res, UseGuards } from '@nestjs/common/decorators';
import { Response } from 'express';
import { HttpStatus } from '@nestjs/common/enums';
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @ApiOperation({ summary: 'register User' })
  @ApiResponse({ status: 201, type: User })
  @Post('signin')
  regist(
    @Body() createUserDto: CreateUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.registration(createUserDto, res);
  }
  //
  @ApiOperation({ summary: 'login User' })
  @ApiResponse({ status: 200, type: User })
  @Post('signip')
  login(
    @Body() loginUserDto: LoginUserDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.login(loginUserDto, res);
  }

  //  LOGOUT
  @ApiOperation({ summary: 'logout User' })
  @ApiResponse({ status: 200, type: User })
  @HttpCode(HttpStatus.OK)
  @Post('signout')
  logout(
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.logout(refreshToken, res);
  }

  //  REFRESH
  @UseGuards(UserGuard)
  @Post(':id/refresh')
  refresh(
    @Param('id') id: string,
    @CookieGetter('refresh_token') refreshToken: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.usersService.refreshToken(+id, refreshToken, res);
  }

  //  ACTIVATE
  @ApiOperation({ summary: 'activate User' })
  @ApiResponse({ status: 200, type: [User] })
  @Get('activate/:link')
  activate(@Param('link') link: string) {
    return this.usersService.activate(link);
  }

  @Post('find')
  finAll(@Body() findUserDto: FindUserDto) {
    return this.usersService.findAll(findUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post('/otp')
  newOTP(@Body() phoneUserDto: PhoneUserDto) {
    return this.usersService.newOTP(phoneUserDto);
  }

  @Post('/verify')
  verifyOtp(@Body() veifyOtpDto: VeifyOtpDto) {
    return this.usersService.verifyOtp(veifyOtpDto);
  }
}
