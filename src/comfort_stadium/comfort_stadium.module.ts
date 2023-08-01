import { Module } from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { ComfortStadiumController } from './comfort_stadium.controller';

@Module({
  controllers: [ComfortStadiumController],
  providers: [ComfortStadiumService]
})
export class ComfortStadiumModule {}
