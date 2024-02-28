
import { Permission } from '../../domain/permission.interface';
import { AddPermissionRequest } from './add-permission.request';

export class AddPermissionCommand
  implements Omit<Permission, 'id' | 'tenantId'>
{
  name: string;
  description?: string;

  constructor(request: AddPermissionRequest) {
    const { name, description } = request;
    this.name = name;
    this.description = description;
  }
}
