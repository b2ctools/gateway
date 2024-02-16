import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { StoreService } from "../../domain/store.service";

@Injectable()
export class RemoveStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService,
  ) {}

  async execute(storeId: ID) {
    await this.storeService.removeStore(storeId);
  }
}
