import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchResourceUseCase {
  constructor(
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.resourceService.findAllResources(request);
  }
}
