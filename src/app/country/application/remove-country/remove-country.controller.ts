import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { countryPath } from '../../../shared/routes';
import { RemoveCountryUseCase } from './remove-country.usecase';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Controller(countryPath)
export class RemoveCountryController {
  constructor(
    @Inject(RemoveCountryUseCase)
    private readonly useCase: RemoveCountryUseCase
  ) {}

  @Delete('/:id')
  async RemoveCountry(@Param('id') id: ID) {
    await this.useCase.execute(id);
    return { message: 'Country succesfully removed' };
  }
}
