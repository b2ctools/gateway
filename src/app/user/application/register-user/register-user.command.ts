import { ID } from '../../../shared/abstract-repository/repository.interface';
import { RegisterUserRequest } from './register-user.request';

export class RegisterUserCommand {
  name: string;
  password: string;
  email: string;
  tenantId: ID;

  constructor(request: RegisterUserRequest) {
    const { name, email, password, tenantId } = request;
    this.name = name;
    this.password = password;
    this.email = email;
    this.tenantId = tenantId
  }
}
