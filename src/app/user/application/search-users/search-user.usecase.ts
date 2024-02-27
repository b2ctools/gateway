import { Injectable, Inject } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import {
  SearchOutput,
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/base.request";
import { UserDto, sortable, userToDto } from "../../domain/user.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class SearchUsersUseCase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  async execute(request: SearchRequest): Promise<SearchOutput<UserDto>> {
    const { count, data } = await this.userService.findAllUsers(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
    const users = data.map((u) => {
      // const tenantRef = this.tenantService.getTenantRef(u.tenantId);
      return userToDto(u);
    });
    return {
      count,
      data: users,
      sortable,
    };
  }
}
