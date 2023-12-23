import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
  // TODO: handle username & password constraints
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
