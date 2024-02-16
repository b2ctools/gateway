import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { storePath } from "../../../shared/routes";
import { UpdateStoreUseCase } from "./update-store.usecase";
import { UpdateStoreRequest } from "./update-store.request";
import { storeToDto } from "../../domain/store.interface";
import { UpdateStoreCommand } from "./update-store.command";

@Controller(storePath)
export class UpdateStoreController {
  constructor(
    @Inject(UpdateStoreUseCase)
    private readonly useCase: UpdateStoreUseCase,
  ) {}

  @Patch()
  async updateStore(@Body() request: UpdateStoreRequest) {
    const pc = await this.useCase.execute(new UpdateStoreCommand(request));
    return storeToDto(pc);
  }
}
