import { Inject, Injectable } from "@nestjs/common";
import { UserService } from "../../domain/user.service";
import { UpdateUserRequest } from "./update-user.request";
import { UserDto, userToDto } from "../../domain/user.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class UpdateUserUseCase {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}

  private sanitazeRequest(request: UpdateUserRequest) {
    const {
      id,
      firstName,
      lastName,
      nickname,
      phone,
      avatar,
      status,
      role,
      birthDay,
      address,
      city,
      state,
      zip,
      countryId,
    } = request;
    return {
      id,
      firstName,
      lastName,
      nickname,
      phone,
      avatar,
      status,
      role,
      birthDay,
      address,
      city,
      state,
      zip,
      countryId,
    };
  }

  async execute(request: UpdateUserRequest): Promise<UserDto> {
    const user = await this.userService.updateUser(
      this.sanitazeRequest(request),
    );
    // const tenantRef = this.tenantService.getTenantRef(user.tenantId);
    return userToDto(user, null);
  }
}
