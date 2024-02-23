
import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { TenantRepository } from '../infrastructure/tenant-repository.type';
import { AddTenantCommand } from '../application/add-tenant/add-tenant.command';
import {
  Tenant,
} from './tenant.interface';
import { ID } from '../../shared/abstract-repository/repository.interface';
import { SearchRequest } from '../../shared/base.request';
import { UpdateTenantRequest } from '../application/update-tenant/update-tenant.request';

@Injectable()
export class TenantService {
  constructor(
    @Inject('TenantRepository')
    private readonly tenantRepo: TenantRepository
  ) {}

  private async verifyTenantName(name: string): Promise<void> {
    const existing = await this.tenantRepo.getTenantByName(name);

    if (existing) {
      throw new BadRequestException(
        `Tenant name  is already taken`
      );
    }
  }

  async findByIdOrFail(tenantId: ID){
    const existingTenant = await this.tenantRepo.findById(tenantId)
    if (!existingTenant){
      throw new BadRequestException(`Tenant with id ${tenantId} not found`);
    }
    return existingTenant;
  }

  async addTenant(command: AddTenantCommand) {
    await this.verifyTenantName(command.name);
    
    const tenant: Tenant = {
      id: null,
      tenantId: null,
      ...command,      
    }

    return await this.tenantRepo.create(tenant);
  }


  async removeTenant(id: ID) {
    await this.tenantRepo.delete(id);
  }

  async findAllTenants(request: SearchRequest) {
    return await this.tenantRepo.findAll(request);
  }

  async updateTenant(request: UpdateTenantRequest): Promise<Tenant> {
    const { id, name, description } = request;
    const existingTenant = await this.findByIdOrFail(id);

    existingTenant.name = name ? name : existingTenant.name;
    existingTenant.description = description ? description : existingTenant.description;

    console.log(
      `Updating Tenant - ${JSON.stringify({
        id,
        name,
        description,
      })}`
    );
    return await this.tenantRepo.persist(existingTenant);
  }
}
