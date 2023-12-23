import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserDataService } from './user-data.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from '../auth/auth.decorator';
import { RequestUser } from '../auth/auth.interface';

@Controller('user-data')
@UseGuards(AuthGuard)
export class UserDataController {
  constructor(private readonly userDataService: UserDataService) {}

  @Get()
  async get(@User() user: RequestUser) {
    // TODO: exclude password
    return this.userDataService.get(user.id);
  }
}
