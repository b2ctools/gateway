import {
  BadRequestException,
  Inject,
  Injectable,
  forwardRef,
} from "@nestjs/common";
import { AddStoreCommand } from "../application/add-store/add-store.command";
import { Store, StoreRef } from "./store.interface";
import { StoreRepository } from "../infrastructure/store-repositor.type";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { AccountService } from "../../account/domain/account.service";
import { codeFromId } from "../../shared/utils/gen-id";
import { UpdateStoreCommand } from "../application/update-store/update-store.command";
import { domainEntityFromTenantVerification } from "../../auth/domain/middleware/access-control";

@Injectable()
export class StoreService {
  private backupStores: Store[] = [];
  constructor(
    @Inject("StoreRepository")
    private readonly storeRepo: StoreRepository,

    @Inject(forwardRef(() => AccountService))
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

  async addStore(command: AddStoreCommand): Promise<Store> {
    await this.verifyStoreName(command.name);
    const store: Store = {
      id: null,
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
    const existintStore = await this.storeRepo.findById(storeId);
    if (!existintStore) {
      throw new BadRequestException(`Store with id ${storeId} not found`);
    }
    domainEntityFromTenantVerification(existintStore);
    return existintStore;
  }

  async findAllStores(request: SearchRequest): Promise<FindAllOutput<Store>> {
    return await this.storeRepo.findAll(request);
  }

  async removeStore(storeId: ID) {
    const existintStore = await this.findByIdOrFail(storeId);
    const accounts = await this.accountService.getAccountsFromStore(storeId);
    if (accounts.length > 0) {
      throw new BadRequestException(
        `Store with id ${storeId} has accounts associated with it`,
      );
    }
    domainEntityFromTenantVerification(existintStore);
    await this.storeRepo.delete(storeId);
    await this.updateBackupStores();
  }

  async updateStore(id: ID, command: UpdateStoreCommand) {
    const { name, description, address, logo, managedBy } = command;
    const store = await this.findByIdOrFail(id);
    domainEntityFromTenantVerification(store);
    if (name) {
      await this.canUpdateName(name, id);
    }
    const storeToUpdate = {
      ...store,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(address ? { address } : {}),
      ...(logo ? { logo } : {}),
      ...(managedBy ? { managedBy } : {}),
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
