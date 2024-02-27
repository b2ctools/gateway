import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveResourceUseCase {
  constructor(
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  async execute(resourceId: ID) {
    await this.resourceService.removeResource(resourceId);
  }
}
