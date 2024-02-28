import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { UpdateStoreCommand } from "./update-store.command";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class UpdateStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService,
  ) {}

  async execute(id: ID, command: UpdateStoreCommand) {
    return await this.storeService.updateStore(id, command);
  }
}
