import { Inject, Injectable, forwardRef } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";
import { StoreService } from "src/app/store/domain/store.service";
import {
  TenantDto,
  sortable,
  tenantToDto,
} from "../../domain/tenant.interface";
import { UserService } from "src/app/user/domain/user.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { User } from "src/app/user/domain/user.interface";

@Injectable()
export class SearchTenantUseCase {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,

    @Inject(forwardRef(() => StoreService))
    private readonly storeService: StoreService,

    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
  ) {}

  private async getPrimeryOwner(id: ID): Promise<{ success: boolean, user: User | null }>{
    try {
      const user = await this.userService.findByIdOrFail(id);
      return {
        success: true,
        user,
      }
    } catch (error) {

      return {
        success: false,
        user: null,

      };
    }
  }

  async execute(request: SearchRequest): Promise<SearchOutput<TenantDto>> {
    const { data: tenants } = await this.tenantService.findAllTenants(request);
    const items = await Promise.all(
      tenants.map( async (tenant) => {
        const { count: storeCount} = await this.storeService.findAllStores({ filters: [{ field: "tenantId", value: tenant.id as string }] });
        const { success, user } = await this.getPrimeryOwner(tenant.primaryOwnerId);
        const primaryOwner = success ? user : null;
        const userCount = (await this.userService.getUsersOfTenant(tenant.id)).length;
        return tenantToDto(tenant, storeCount, primaryOwner, userCount);
      })
    );

    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
