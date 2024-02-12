import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../domain/user.service";

@Injectable()
export class UpdateUserUsecase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService
  ) {}

  async execute() {
    
  }
}
