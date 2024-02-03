import { Body, Controller, Inject, Post } from '@nestjs/common';
import { AddStoreUseCase } from './add-store.usecase';
import { AddStoreRequest } from './add-store.request';
import { AddStoreCommand } from './add-store.command';
import { storePath } from '../../../shared/routes';

@Controller(storePath)
export class AddStoreController {
  constructor(
    @Inject(AddStoreUseCase)
    private readonly useCase: AddStoreUseCase
  ) {}

  @Post()
  async AddStore(@Body() request: AddStoreRequest) {
    return await this.useCase.execute(new AddStoreCommand(request));
  }
}
