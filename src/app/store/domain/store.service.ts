import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { AddStoreCommand } from "../application/add-store/add-store.command";
import { Store, StoreRef } from "./store.interface";
import { StoreRepository } from "../infrastructure/store-repositor.type";
import { SearchRequest } from "../../shared/base.request";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { AccountService } from "../../account/domain/account.service";
import { codeFromId } from "src/app/shared/utils/gen-id";

@Injectable()
export class StoreService {
  private backupStores: Store[] = [];
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepo: StoreRepository,

    @Inject(AccountService)
    private readonly accountService: AccountService,
  ) {}

  getStoreRef(storeId: ID): StoreRef {
    if (!storeId) {
      return null;
    }
    const store = this.backupStores.find((t) => t.id === storeId);
    return {
      id: store.id,
      name: store.name,
      code: codeFromId(store.id),
    };
  }

  private async updateBackupStores() {
    const response = await this.storeRepo.findAll({});
    this.backupStores = response.data;
  }

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
    const response = await this.storeRepo.create(store);
    await this.updateBackupStores();
    return response;
  }

  async findByIdOrFail(storeId: ID) {
    const existingPC = await this.storeRepo.findById(storeId);
    if (!existingPC) {
      throw new BadRequestException(`Store with id ${storeId} not found`);
    }
    return existingPC;
  }

  async findAllStores(request: SearchRequest): Promise<FindAllOutput<Store>> {
    this.storeRepo.logItems();
    return await this.storeRepo.findAll(request);
  }

  async removeStore(storeId: ID) {
    await this.findByIdOrFail(storeId);
    const accounts = await this.accountService.getAccountsFromStore(storeId);
    if (accounts.length > 0) {
      throw new BadRequestException(
        `Store with id ${storeId} has accounts associated with it`,
      );
    }
    await this.storeRepo.delete(storeId);
    await this.updateBackupStores();
  }

  async updateStore(storeRequest: Omit<Store, "tenantId">) {
    const { id, name, description } = storeRequest;
    const store = await this.findByIdOrFail(id);
    if (name) {
      await this.canUpdateName(name, id);
    }
    const storeToUpdate = {
      ...store,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
    };

    const response = await this.storeRepo.persist(storeToUpdate);
    await this.updateBackupStores();
    return response;
  }

  private async canUpdateName(name: string, existingId: ID) {
    const store = await this.storeRepo.getStoreByName(name);
    if (store && store.id !== existingId) {
      throw new BadRequestException(`Store name ${name} is already taken`);
    }
  }
}
