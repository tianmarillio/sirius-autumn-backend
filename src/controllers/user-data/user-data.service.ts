import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/database/prisma/prisma.service';

@Injectable()
export class UserDataService {
  constructor(private prisma: PrismaService) {}

  async get(id: string) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }
}
