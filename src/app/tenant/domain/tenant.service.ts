import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { TenantRepository } from "../infrastructure/tenant-repository.type";
import { AddTenantCommand } from "../application/add-tenant/add-tenant.command";
import { Tenant, TenantRef } from "./tenant.interface";
import { FindAllOutput, ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdateTenantRequest } from "../application/update-tenant/update-tenant.request";
import { codeFromId } from "../../shared/utils/gen-id";

@Injectable()
export class TenantService {
  private backupTenants: Tenant[] = [];
  constructor(
    @Inject("TenantRepository")
    private readonly tenantRepo: TenantRepository,
  ) {}

  private async updateBackupTenants() {
    const response = await this.tenantRepo.findAll({});
    this.backupTenants = response.data;
  }

  getTenantRef(tenantId: ID): TenantRef {
    if (!tenantId) {
      return null;
    }
    const tenant = this.backupTenants.find((t) => t.id === tenantId);

    if (!tenant) {
      return null;
    }

    return {
      id: tenant.id,
      name: tenant.name,
      code: codeFromId(tenant.id),
    };
  }

  async getTenantByName(name: string): Promise<Tenant> {
    return await this.tenantRepo.getTenantByName(name);
  }

  private async verifyTenantName(name: string): Promise<void> {
    const existing = await this.tenantRepo.getTenantByName(name);

    if (existing) {
      throw new BadRequestException(`Tenant name  is already taken`);
    }
  }

  async findByIdOrFail(tenantId: ID) {
    const existingTenant = await this.tenantRepo.findById(tenantId);
    if (!existingTenant) {
      throw new BadRequestException(`Tenant with id ${tenantId} not found`);
    }
    return existingTenant;
  }

  async addTenant(command: AddTenantCommand) {
    await this.verifyTenantName(command.name);

    const tenant: Tenant = {
      id: null,
      planId: null,
      ...command,
    };

    const response = await this.tenantRepo.create(tenant);
    this.updateBackupTenants();
    return response;
  }

  async removeTenant(id: ID) {
    await this.tenantRepo.delete(id);
    this.updateBackupTenants();
  }
  
  async findAllTenants(request: SearchRequest): Promise<FindAllOutput<Tenant>> {
    return await this.tenantRepo.findAll(request);
  }

  async updateTenant(id: ID, request: UpdateTenantRequest): Promise<Tenant> {

    const { name, description, address, logo, primaryOwnerId, state } = request;
    const existingTenant = await this.findByIdOrFail(id);
    if (name) {
      await this.canUpdateName(name, existingTenant.id);
    }

    const tenantToUpdate: Tenant = {
      ...existingTenant,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(address ? { address } : {}),
      ...(logo ? { logo } : {}),
      ...(primaryOwnerId ? { primaryOwnerId } : {}),
      ...(state ? { state } : {}),
    }

    console.log(`Updating Tenant - ${JSON.stringify(request)}`);
    const response = await this.tenantRepo.persist(tenantToUpdate);
    this.updateBackupTenants();
    return response;
  }

  private async canUpdateName(name: string, existingId: ID) {
    const tenant = await this.tenantRepo.getTenantByName(name);
    if (tenant && tenant.id !== existingId) {
      throw new BadRequestException(`Tenant name ${name} is already taken`);
    }
  }

  async setPlan(id: ID, planId: ID) {
    const tenant = await this.findByIdOrFail(id);
    tenant.planId = planId;
    return await this.tenantRepo.persist(tenant);
  }
}
