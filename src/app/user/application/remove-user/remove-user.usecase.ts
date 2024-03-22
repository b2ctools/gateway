import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { UserService } from "../../domain/user.service";

@Injectable()
export class RemoveSampleUseCase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async execute(userId: ID) {
    await this.userService.findByIdOrFail(userId);
    await this.userService.removeUser_id(userId);
  }
}
