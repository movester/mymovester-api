import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@app/persistence/domain/user/entity/user.entity';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/')
  getUser(): Promise<User> {
    return this.userService.getUser();
  }
}
