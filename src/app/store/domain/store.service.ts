import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AddStoreCommand } from "../application/add-store/add-store.command";
import { Store } from "./store.interface";
import { StoreRepository } from "../infrastructure/store-repositor.type";
import { SearchRequest } from "../../shared/base.request";
import { ID } from "../../shared/abstract-repository/repository.interface";

@Injectable()
export class StoreService {
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepo: StoreRepository,
  ) {}

  private async verifyStoreName(name: string): Promise<void> {
    const existingStore = await this.storeRepo.getStoreByName(name);

    if (existingStore) {
      throw new BadRequestException(`Store name ${name} is already taken`);
    }
  }

  async addStore(command: AddStoreCommand) {
    await this.verifyStoreName(command.name);
    const store: Store = {
      id: null,
      tenantId: null,
      ...command,
    };

    console.log("Adding Store ", {
      name: store.name,
      description: store.description,
    });
    return await this.storeRepo.create(store);
  }

  async findByIdOrFail(storeId: ID) {
    const existingPC = await this.storeRepo.findById(storeId);
    if (!existingPC) {
      throw new BadRequestException(`Store with id ${storeId} not found`);
    }
    return existingPC;
  }

  async findAllStores(request: SearchRequest) {
    this.storeRepo.logItems();
    return await this.storeRepo.findAll(request);
  }

  async onApplicationBootstrap() {}
}
