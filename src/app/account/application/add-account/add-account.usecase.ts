import { Inject, Injectable } from "@nestjs/common";
import { AccountService } from "../../domain/account.service";
import { AddAccountCommand } from "./add-account.command";
import { StoreService } from "src/app/store/domain/store.service";
import { UserService } from "src/app/user/domain/user.service";

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

  async execute(command: AddAccountCommand) {
    const { storeId, userId } = command;
    // validations
    await this.storeService.findByIdOrFail(storeId);
    await this.userService.findByIdOrFail(userId);

    return await this.pcService.addAccount(command);
  }
}
