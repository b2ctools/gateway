import { Inject, Injectable } from "@nestjs/common";
import { ResourceService } from "../../domain/resource.service";
import { SearchRequest, sanitazeSearchQueryParams } from "../../../shared/filters-and-request/base.request";
import { sortable } from "../../domain/resource.interface";

@Injectable()
export class SearchResourceUseCase {
  constructor(
    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.resourceService.findAllResources(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable)
    );
  }
}
