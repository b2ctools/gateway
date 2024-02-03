import { Inject, Injectable } from '@nestjs/common';
import { LoginService } from '../../domain/login.service';
import { sessionService } from '../../domain/session.service';
import { Credentials } from './login.request';
import { UserService } from '../../../user/domain/user.service';

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(LoginService)
    private readonly loginService: LoginService,

    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async execute(credencials: Credentials) {
    
    const login = await this.loginService.login(credencials);
    const user = await this.userService.findUserByEmail(credencials.email);
    sessionService.registerSession(user.id, login.session);

    return login;
  }
}
