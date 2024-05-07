import { User } from '@app/persistence/domain/user/entity/user.entity';
import { UserRepository } from '@app/persistence/domain/user/repository/user.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserService',
      useClass: UserService,
    },
    UserRepository,
  ],
})
export class UserModule {}
