import { Injectable } from '@nestjs/common';
import { Roles } from './auth/domain/middleware/roles.decorator';
import { UserRole } from './user/domain/user.interface';

@Injectable()
export class AppService {

  @Roles([UserRole.ADMIN, UserRole.OWNER])
  getData(): { message: string } {
    const message = 'Welcome to Platform CU Backend System!';
    console.log(message);
    return { message };
  }

}