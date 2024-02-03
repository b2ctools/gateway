import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../../domain/user.service';
import { RegisterUserCommand } from './register-user.command';
import { User } from '../../domain/user.interface';

@Injectable()
export class RegisterUserUseCase {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async execute(comand: RegisterUserCommand): Promise<User> {
    return await this.userService.registerUser(comand); 
  }
}
