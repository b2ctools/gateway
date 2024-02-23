
import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { tenantPath } from '../../../shared/routes';
import { RemoveTenantUseCase } from './remove-tenant.usecase';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Controller(tenantPath)
export class RemoveTenantController {
  constructor(
    @Inject(RemoveTenantUseCase)
    private readonly useCase: RemoveTenantUseCase
  ) {}

  @Delete('/:id')
  async removeTenant(@Param('id') id: ID) {
    await this.useCase.execute(id);
    return { message: 'Tenant succesfully removed' };
  }
}
