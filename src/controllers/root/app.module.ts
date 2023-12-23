import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '../../database/prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { NanoidModule } from '../../utils/nanoid/nanoid.module';
import { BcryptModule } from '../../utils/bcrypt/bcrypt.module';
import { UserDataModule } from '../user-data/user-data.module';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, NanoidModule, BcryptModule, UserDataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
