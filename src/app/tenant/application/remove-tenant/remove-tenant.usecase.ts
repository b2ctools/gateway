import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveTenantUseCase {
  constructor(
    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(tenantId: ID) {
    await this.tenantService.removeTenant(tenantId);
  }
}
