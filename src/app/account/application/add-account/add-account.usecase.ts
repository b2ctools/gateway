import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { AddAccountCommand } from "./add-account.command";
import { StoreService } from "src/app/store/domain/store.service";
import { UserService } from "src/app/user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { UserRole } from "src/app/user/domain/user.interface";

@Injectable()
export class AddAccountUseCase {
  constructor(
    @Inject(AccountService)
    private readonly pcService: AccountService,

    @Inject(StoreService)
    private readonly storeService: StoreService,

    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  private async verifyUser(userId: ID) {
    const user = await this.userService.findByIdOrFail(userId);
    if (user.role != UserRole.USER) {
      throw new BadRequestException(
        `User with role [${user.role}] is not allowed to have an account`,
      );
    }
  }

  async execute(command: AddAccountCommand) {
    const { storeId, userId } = command;
    // validations
    await this.storeService.findByIdOrFail(storeId);
    await this.verifyUser(userId);

    return await this.pcService.addAccount(command);
  }
}
