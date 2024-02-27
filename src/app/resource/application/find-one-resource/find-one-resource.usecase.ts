import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { ResourceDto, resourceToDto } from "../../domain/resource.interface";

@Injectable()
export class FindOneResourceUseCase {
  constructor(
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  async execute(id: ID): Promise<ResourceDto> {
    const resource = await this.resourceService.findByIdOrFail(id);
    return resourceToDto(resource);
  }
}
