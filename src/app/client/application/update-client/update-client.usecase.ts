
import { Inject, Injectable } from '@nestjs/common';
import { ClientService } from '../../domain/client.service';
import { UpdateClientRequest } from './update-client.request';

@Injectable()
export class UpdateClientUseCse {
  constructor(
    @Inject(ClientService)
    private readonly clientService: ClientService
  ) {}

  async execute(request: UpdateClientRequest) {
    return await this.clientService.updateClient(request);
  }
}
