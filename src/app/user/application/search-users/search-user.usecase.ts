import { Injectable, Inject } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import {
  SearchRequest,
  sanitazeSearchQueryParams,
} from "../../../shared/base.request";
import { sortable } from "../../domain/user.interface";

@Injectable()
export class SearchUsersUseCase {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async execute(request: SearchRequest) {
    return await this.userService.findAllUsers(
      sanitazeSearchQueryParams<SearchRequest>(request, sortable),
    );
  }
}
