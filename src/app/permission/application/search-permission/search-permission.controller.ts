import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchPermissionUseCase } from "./search-permission.usecase";
import {
  PermissionDto,
  sortable,
  permissionToDto,
} from "../../domain/permission.interface";
import { permissionPath } from "../../../shared/routes";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(permissionPath)
export class SearchPermissionController {
  constructor(
    @Inject(SearchPermissionUseCase)
    private readonly useCase: SearchPermissionUseCase,
  ) {}

  @Get()
  async findAllPermissions(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<PermissionDto>> {
    const { data: permissions } = await this.useCase.execute(request);
    const items = permissions.map((s) => permissionToDto(s));
    return {
      count: items.length,
      data: items,
      sortable,
    };
  }
}
