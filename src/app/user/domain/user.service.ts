import {
  Injectable,
  Inject,
  BadRequestException,
  forwardRef,
} from "@nestjs/common";
import { RegisterUserCommand } from "../application/register-user/register-user.command";
import { User, UserStatus } from "./user.interface";
import { UserRepository } from "../infrastructure/user-repository.type";
import { encodePassword } from "../../auth/domain/encoder.service";
import { ctxSrv } from "../../shared/context.service";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { AccountService } from "../../account/domain/account.service";
import { Account } from "src/app/account/domain/account.interface";
import { EqualFilter } from "../../shared/filters-and-request/request-filters";

@Injectable()
export class UserService {
  constructor(
    @Inject("UserRepository")
    private readonly userRepo: UserRepository,

    @Inject(forwardRef(() => AccountService))
    private readonly accountService: AccountService,
  ) {}

  private async verifyEmail(email: string): Promise<void> {
    const existingUser = await this.userRepo.getUserByEmail(email);

    if (existingUser)
      throw new BadRequestException(`Email ${email} is already taken`);
  }

  async registerUser(comand: RegisterUserCommand): Promise<User> {
    const { password, ...comandInfo } = comand;
    console.log("Registering User ", comandInfo);

    //verifying email
    await this.verifyEmail(comand.email);

    const user: User = {
      ...comandInfo,
      id: null,
      recoveryPasswordCode: null,
      failedLogin: 0,
      isEmailConfirmed: false,
      isPhoneConfirmed: false,
      status: UserStatus.ENABLED,
      password: encodePassword(password),
    };

    return await this.userRepo.create(user);
  }

  async findUserByEmail(email: string): Promise<User> {
    return (await this.userRepo.getUserByEmail(email)) as User;
  }

  async findAllUsers(request: SearchRequest): Promise<FindAllOutput<User>> {
    this.userRepo.logItems();
    return await this.userRepo.findAll(request);
  }

  async setPasswordRecoveryCode(email: string, code: string) {
    if (!email) {
      throw new BadRequestException(
        "Error setting password recovery code, email must be provided",
      );
    }

    if (!code) {
      throw new BadRequestException(
        "Error setting password recovery code, the code must be provided",
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
        `Error fetching user with email [${email}], user was not found`,
      );
    return user;
  }

  async findByIdOrFail(userId: ID) {
    const existingUser = await this.userRepo.findById(userId);
    if (!existingUser) {
      throw new BadRequestException(`User with id ${userId} not found`);
    }
    return existingUser;
  }

  async incFailedLogin(userId: ID) {
    const existingUser = await this.findByIdOrFail(userId);
    existingUser.failedLogin = existingUser.failedLogin + 1;
    return await this.userRepo.persist(existingUser);
  }

  async resetFailedLogin(userId: ID) {
    const existingUser = await this.findByIdOrFail(userId);
    existingUser.failedLogin = 0;
    return await this.userRepo.persist(existingUser);
  }

  async updateUser(
    id: ID,
    userInfo: Partial<Omit<User, ", tenantId" | "password">>,
  ) {
    const {
      firstName,
      lastName,
      nickname,
      email,
      phone,
      role,
      status,
      avatar,
      birthDay,
      address,
      city,
      zip,
      countryId,
      isEmailConfirmed,
      isPhoneConfirmed,
    } = userInfo;
    const user = await this.findByIdOrFail(id);
    if (email) {
      await this.canUpdateEmail(email, user.id);
    }
    const userToUpdate = {
      ...user,
      ...(firstName ? { firstName } : {}),
      ...(lastName ? { lastName } : {}),
      ...(nickname ? { nickname } : {}),
      ...(email ? { email } : {}),
      ...(phone ? { phone } : {}),
      ...(role ? { role } : {}),
      ...(status ? { status } : {}),
      ...(avatar ? { avatar } : {}),
      ...(birthDay ? { birthDay } : {}),
      ...(address ? { address } : {}),
      ...(city ? { city } : {}),
      ...(zip ? { zip } : {}),
      ...(countryId ? { countryId } : {}),
      ...(isEmailConfirmed ? { isEmailConfirmed } : {}),
      ...(isPhoneConfirmed ? { isPhoneConfirmed } : {}),
    };

    console.log(`Updating User - ${JSON.stringify({ userToUpdate })}`);

    return await this.userRepo.persist(userToUpdate);
  }

  async me() {
    const userId = ctxSrv.getUserId();
    try {
      return await this.findByIdOrFail(userId);
    } catch (error) {
      throw new BadRequestException(`Error fetching user with id ${userId}`);
    }
  }

  async removeUser_id(userId: ID) {
    await this.findByIdOrFail(userId);
    await this.userRepo.delete(userId);
  }

  async removeUser_email(email: string) {
    const user = await this.findUserByEmail(email);
    if (user) {
      return new BadRequestException(`User with email ${email} not found`);
    }
    await this.userRepo.delete(user.id);
  }

  private async canUpdateEmail(email: string, existingId: ID) {
    const user = await this.userRepo.getUserByEmail(email);
    if (user && user.id !== existingId) {
      throw new BadRequestException(`User email ${email} is already taken`);
    }
  }

  async getAccounts(): Promise<Account[]> {
    const userId = ctxSrv.getUserId();
    return await this.accountService.getAccountsFromUserOnly(userId);
  }

  async getUsersOfTenant(tenantId: ID): Promise<User[]> {
    const { data: accounts } = await this.accountService.findAllAccounts({
      filters: [new EqualFilter("tenantId", tenantId as string)]
    });

    const ids = accounts.map((a) => a.userId);
    const userIds = [...new Set(ids)];

    const users = await Promise.all(
      userIds.map(async (id) => {
        return await this.userRepo.findById(id);
      }),
    );

    return users.filter((u) => u);
  }

}
