import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { UpdateStoreCommand } from "./update-store.command";

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService,
  ) {}

  async execute(command: UpdateStoreCommand) {
    return await this.storeService.updateStore(command);
  }
}
