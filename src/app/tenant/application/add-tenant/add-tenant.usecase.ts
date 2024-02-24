import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { AddTenantCommand } from "./add-tenant.command";

@Injectable()
export class AddTenantUseCase {
  constructor(
    @Inject(TenantService)
    private readonly pcService: TenantService,
  ) {}

  async addTenant(command: AddTenantCommand) {
    return await this.pcService.addTenant(command);
  }
}
