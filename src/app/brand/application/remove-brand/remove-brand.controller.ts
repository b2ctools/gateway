import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { brandPath } from '../../../shared/routes';
import { RemoveBrandUseCase } from './remove-brand.usecase';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Controller(brandPath)
export class RemoveBrandController {
  constructor(
    @Inject(RemoveBrandUseCase)
    private readonly useCase: RemoveBrandUseCase
  ) {}

  @Delete('/:id')
  async removeBrand(@Param('id') id: ID) {
    await this.useCase.execute(id);
    return { message: 'Brand succesfully removed' };
  }
}
