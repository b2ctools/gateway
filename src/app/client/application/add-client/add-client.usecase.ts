
import { Inject, Injectable } from '@nestjs/common';
import { ClientService } from '../../domain/client.service';
import { AddClientCommand } from './add-client.command';

@Injectable()
export class AddClientUseCase {
  constructor(
    @Inject(ClientService)
    private readonly pcService: ClientService
  ) {}

  async addClient(command: AddClientCommand){
    return await this.pcService.addClient(command);
  }

}
