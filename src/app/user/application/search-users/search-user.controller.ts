import { Controller, Inject, Get, Query } from "@nestjs/common";
import { userPath } from "../../../shared/routes";
import { SearchUsersUseCase } from "./search-user.usecase";
import { UserDto } from "../../domain/user.interface";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";

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
    return await this.useCase.execute(request);
  }
}
