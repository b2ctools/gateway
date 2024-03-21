import { Inject, Injectable } from "@nestjs/common";
import { PermissionService } from "../../domain/permission.service";
import { SearchRequest, sanitazeSearchQueryParams } from "../../../shared/filters-and-request/base.request";
import { sortable } from "../../domain/permission.interface";

@Injectable()
export class SearchPermissionUseCase {
  constructor(
    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.permissionService.findAllPermissions(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable)
    );
  }
}
