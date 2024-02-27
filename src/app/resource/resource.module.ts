import { Module } from "@nestjs/common";
import { getResourceRepo } from "./infrastructure/resource.repo-provider";
import { AddResourceController } from "./application/add-resource/add-resource.controller";
import { AddResourceUseCase } from "./application/add-resource/add-resource.usecase";
import { ResourceService } from "./domain/resource.service";
import { SearchResourceController } from "./application/search-resource/search-resource.controller";
import { SearchResourceUseCase } from "./application/search-resource/search-resource.usecase";
import { RemoveResourceController } from "./application/remove-resource/remove-resource.controller";
import { RemoveResourceUseCase } from "./application/remove-resource/remove-resource.usecase";
import { UpdateResourceController } from "./application/update-resource/update-resource.controller";
import { UpdateResourceUseCse } from "./application/update-resource/update-resource.usecase";
import { FindOneResourceController } from "./application/find-one-resource/find-one-resource.controller";
import { FindOneResourceUseCase } from "./application/find-one-resource/find-one-resource.usecase";

@Module({
  imports: [],
  controllers: [
    AddResourceController,
    SearchResourceController,
    RemoveResourceController,
    UpdateResourceController,
    FindOneResourceController,
  ],
  providers: [
    AddResourceUseCase,
    SearchResourceUseCase,
    RemoveResourceUseCase,
    UpdateResourceUseCse,
    ResourceService,
    getResourceRepo(),
    FindOneResourceUseCase,
  ],
  exports: [ResourceService],
})
export class ResourceModule {}
