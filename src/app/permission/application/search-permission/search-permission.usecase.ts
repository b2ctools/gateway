import { Inject, Injectable } from "@nestjs/common";
import { PermissionService } from "../../domain/permission.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchPermissionUseCase {
  constructor(
    @Inject(PermissionService)
    private readonly permissionService: PermissionService,
  ) {}

  async execute(request: SearchRequest) {
    return await this.permissionService.findAllPermissions(request);
  }
}
