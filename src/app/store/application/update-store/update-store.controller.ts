import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { storePath } from "../../../shared/routes";
import { UpdateStoreUseCase } from "./update-store.usecase";
import { UpdateStoreRequest } from "./update-store.request";
import { storeToDto } from "../../domain/store.interface";
import { UpdateStoreCommand } from "./update-store.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { allowedForScope } from "src/app/auth/domain/middleware/access-control";
import { Scope } from "src/app/account/domain/account.interface";

@Controller(storePath)
export class UpdateStoreController {
  constructor(
    @Inject(UpdateStoreUseCase)
    private readonly useCase: UpdateStoreUseCase,
  ) {}

  @Patch(":id")
  async updateStore(@Param("id") id: ID, @Body() request: UpdateStoreRequest) {
    allowedForScope([Scope.MANAGER, Scope.OWNER]);
    const pc = await this.useCase.execute(id, new UpdateStoreCommand(request));
    return storeToDto(pc);
  }
}
