
import { Controller, Delete, Inject, Param } from '@nestjs/common';
import { clientPath } from '../../../shared/routes';
import { RemoveClientUseCase } from './remove-client.usecase';
import { ID } from '../../../shared/abstract-repository/repository.interface';

@Controller(clientPath)
export class RemoveClientController {
  constructor(
    @Inject(RemoveClientUseCase)
    private readonly useCase: RemoveClientUseCase
  ) {}

  @Delete('/:id')
  async removeClient(@Param('id') id: ID) {
    await this.useCase.execute(id);
    return { message: 'Client succesfully removed' };
  }
}
