
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { clientPath } from '../../../shared/routes';
import { AddClientUseCase } from './add-client.usecase';
import { AddClientRequest } from './add-client.request';
import { AddClientCommand } from './add-client.command';
import { clientToDto } from '../../domain/client.interface';

@Controller(clientPath)
export class AddClientController {
  constructor(
    @Inject(AddClientUseCase)
    private readonly useCase: AddClientUseCase
  ) {}

  @Post()
  async addClient(@Body() request: AddClientRequest) {
    
    const pc = await this.useCase.addClient(
      new AddClientCommand(request)
    );
    return clientToDto(pc);
  }
}
