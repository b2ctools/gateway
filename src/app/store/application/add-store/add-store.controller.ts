import { Body, Controller, Inject, Post } from "@nestjs/common";
import { AddStoreUseCase } from "./add-store.usecase";
import { AddStoreRequest } from "./add-store.request";
import { AddStoreCommand } from "./add-store.command";
import { storePath } from "../../../shared/routes";
import { Scope } from "src/app/account/domain/account.interface";
import { allowedForScope } from "src/app/auth/domain/middleware/access-control";

@Controller(storePath)
export class AddStoreController {
  constructor(
    @Inject(AddStoreUseCase)
    private readonly useCase: AddStoreUseCase,
  ) {}

  @Post()
  async addStore(@Body() request: AddStoreRequest) {
    allowedForScope([Scope.MANAGER, Scope.OWNER]);
    return await this.useCase.execute(new AddStoreCommand(request));
  }
}
