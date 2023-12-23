import { Module } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { UserDataController } from './user-data.controller';
import { AuthModule } from '../auth/auth.module';
import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  controllers: [UserDataController],
  providers: [UserDataService],
  imports: [AuthModule, PrismaModule],
})
export class UserDataModule {}
