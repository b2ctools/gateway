
import { Inject, Injectable } from '@nestjs/common';
import { PermissionService } from '../../domain/permission.service';
import { AddPermissionCommand } from './add-permission.command';

@Injectable()
export class AddPermissionUseCase {
  constructor(
    @Inject(PermissionService)
    private readonly pcService: PermissionService
  ) {}

  async addPermission(command: AddPermissionCommand){
    return await this.pcService.addPermission(command);
  }

}
