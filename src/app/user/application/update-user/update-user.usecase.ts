import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import { UpdateUserRequest } from "./update-user.request";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  private sanitazeRequest(request: UpdateUserRequest) {
    const { id, firstName, nickname, email, phone, avatar, status, role, birthDay, address, city, state, zip, countryId } = request;
    return { id, firstName, nickname, email, phone, avatar, status, role, birthDay, address, city, state, zip, countryId }
  }

  async execute(request: UpdateUserRequest) {
    
    return await this.userService.updateUser(this.sanitazeRequest(request));
  }
}
