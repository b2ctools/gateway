import { Inject, Injectable } from '@nestjs/common';
import { StoreService } from '../../domain/store.service';
import { AddStoreCommand } from './add-store.command';

@Injectable()
export class AddStoreUseCase {
  constructor(
    @Inject(StoreService)
    private readonly StoreService: StoreService
  ) {}

  async execute(command: AddStoreCommand){
    return await this.StoreService.AddStore(command);
  }
}
