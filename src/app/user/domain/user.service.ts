import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { RegisterUserCommand } from '../application/register-user/register-user.command';
import { User, UserRole, UserStatus } from './user.interface';
import { UserRepository } from '../infrastructure/user-repository.type';
import { encodePassword } from '../../auth/domain/encoder.service';
import { ctxSrv } from '../../shared/context.service';
import { ID } from '../../shared/abstract-repository/repository.interface';
import { SearchRequest } from '../../shared/base.request';

@Injectable()
export class UserService {
  constructor(
    @Inject('UserRepository')
    private readonly userRepo: UserRepository
  ) {}

  private async verifyEmail(email: string): Promise<void> {
    const existingUser = await this.userRepo.getUserByEmail(email);

    if (existingUser)
      throw new BadRequestException(`Email ${email} is already taken`);
  }

  async registerUser(comand: RegisterUserCommand): Promise<User> {
    const { password, ...comandInfo } = comand;
    console.log('Registering User ', comandInfo);

    //verifying email
    await this.verifyEmail(comand.email);

    //setting tenantId on context service
    ctxSrv.setTenantId(comand.tenantId)

    const user: User = {
      id: null,
      tenantId: null,
      recoveryPasswordCode: null,
      failedLogin: 0,
      ...comandInfo,
      status: UserStatus.ENABLED,
      role: UserRole.USER,
      password: encodePassword(password),
    };

    return await this.userRepo.create(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return (await this.userRepo.getUserByEmail(email)) as User;
  }

  async findAllUsers(request: SearchRequest) {
    this.userRepo.logItems();
    return await this.userRepo.findAll(request);
  }

  async setPasswordRecoveryCode(email: string, code: string) {
    if (!email) {
      throw new BadRequestException(
        'Error setting password recovery code, email must be provided'
      );
    }

    if (!code) {
      throw new BadRequestException(
        'Error setting password recovery code, the code must be provided'
      );
    }

    const user = await this.getAndVerifyUser(email);
    user.recoveryPasswordCode = code;
    await this.userRepo.persist(user);
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.getAndVerifyUser(email);
    user.password = encodePassword(newPassword);
    await this.userRepo.persist(user);
  }

  async getAndVerifyUser(email: string) {
    const user = await this.findUserByEmail(email);
    if (!user)
      throw new BadRequestException(
        `Error fetching user with email [${email}], user was not found`
      );
    return user;
  }

  async findByIdOrFail(userId: ID){
    const existingUser = await this.userRepo.findById(userId)
    if (!existingUser){
      throw new Error(`Inc Failed Loging Error. User with id ${userId} not found`);
    }
    return existingUser;
  }

  async incFailedLogin(userId: ID){
    const existingUser = await this.findByIdOrFail(userId)
    existingUser.failedLogin = existingUser.failedLogin + 1;
    return await this.userRepo.persist(existingUser);
  }

  async resetFailedLogin(userId: ID){
    const existingUser = await this.findByIdOrFail(userId)
    existingUser.failedLogin = 0;
    return await this.userRepo.persist(existingUser);
  }
}