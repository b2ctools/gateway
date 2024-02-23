import { Controller, Inject, Get, Query } from "@nestjs/common";
import { userPath } from "../../../shared/routes";
import { SearchUsersUseCase } from "./search-user.usecase";
import { UserDto, sortable, userToDto } from "../../domain/user.interface";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";

@Controller(userPath)
export class SearchUsersController {
  constructor(
    @Inject(SearchUsersUseCase) private readonly useCase: SearchUsersUseCase,
  ) {}

  // @UseGuards(RoleChecking)
  // @Roles([UserRole.USER])
  @Get()
  async SearchUsers(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<UserDto>> {
    const { count, data } = await this.useCase.execute(request);
    const users = data.map((u) => userToDto(u));
    return {
      count,
      data: users,
      sortable,
    };
  }
}
