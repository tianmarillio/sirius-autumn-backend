import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/database/prisma/prisma.module';
import { NanoidModule } from 'src/utils/nanoid/nanoid.module';
import { BcryptModule } from 'src/utils/bcrypt/bcrypt.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';

@Module({
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  imports: [
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET_KEY,
        // TODO: check expire token
        // signOptions: { expiresIn: '5 seconds' },
        signOptions: { expiresIn: '7d' },
        global: true,
      }),
    }),
    PrismaModule,
    NanoidModule,
    BcryptModule,
  ],
  exports: [AuthGuard, JwtModule],
})
export class AuthModule {}
