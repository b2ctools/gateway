
import { Module } from '@nestjs/common';
import { getPermissionRepo } from './infrastructure/permission.repo-provider';
import { AddPermissionController } from './application/add-permission/add-permission.controller';
import { AddPermissionUseCase } from './application/add-permission/add-permission.usecase';
import { PermissionService } from './domain/permission.service';
import { SearchPermissionController } from './application/search-permission/search-permission.controller';
import { SearchPermissionUseCase } from './application/search-permission/search-permission.usecase';
import { RemovePermissionController } from './application/remove-permission/remove-permission.controller';
import { RemovePermissionUseCase } from './application/remove-permission/remove-permission.usecase';
import { UpdatePermissionController } from './application/update-permission/update-permission.controller';
import { UpdatePermissionUseCse } from './application/update-permission/update-permission.usecase';
import { FindOnePermissionController } from './application/find-one-permission/find-one-permission.controller';
import { FindOnePermissionUseCase } from './application/find-one-permission/find-one-permission.usecase';

@Module({
  imports: [],
  controllers: [AddPermissionController, SearchPermissionController, RemovePermissionController, UpdatePermissionController, FindOnePermissionController],
  providers: [AddPermissionUseCase, SearchPermissionUseCase, RemovePermissionUseCase, UpdatePermissionUseCse, PermissionService, getPermissionRepo(), FindOnePermissionUseCase],
  exports: [PermissionService],
})
export class PermissionModule {}
