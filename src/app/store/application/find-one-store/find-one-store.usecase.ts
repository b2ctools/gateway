import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class FindOneStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly storeService: StoreService
  ) {}

  async execute(id: ID) {
    return await this.storeService.findByIdOrFail(id);
  }
}