
import { Module } from '@nestjs/common';
import { getClientRepo } from './infrastructure/client.repo-provider';
import { AddClientController } from './application/add-client/add-client.controller';
import { AddClientUseCase } from './application/add-client/add-client.usecase';
import { ClientService } from './domain/client.service';
import { SearchClientController } from './application/search-client/search-client.controller';
import { SearchClientUseCase } from './application/search-client/search-client.usecase';
import { RemoveClientController } from './application/remove-client/remove-client.controller';
import { RemoveClientUseCase } from './application/remove-client/remove-client.usecase';
import { UpdateClientController } from './application/update-client/update-client.controller';
import { UpdateClientUseCse } from './application/update-client/update-client.usecase';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule],
  controllers: [AddClientController, SearchClientController, RemoveClientController, UpdateClientController],
  providers: [AddClientUseCase, SearchClientUseCase, RemoveClientUseCase, UpdateClientUseCse, ClientService, getClientRepo()],
  exports: [ClientService],
})
export class ClientModule {}
