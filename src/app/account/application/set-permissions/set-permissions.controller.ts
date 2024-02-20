import { Body, Controller, Inject, Post } from "@nestjs/common";
import { accountPath } from "../../../shared/routes";
import { SetPermissionsUseCase } from "./set-permissions.usecase";
import { SetPermissionsRequest } from "./set-permissions.request";

@Controller(accountPath)
export class SetPermissionsController {
  constructor(
    @Inject(SetPermissionsUseCase)
    private readonly useCase: SetPermissionsUseCase,
  ) {}

  @Post("set-permissions")
  async setPermissions(@Body() request: SetPermissionsRequest) {
    return await this.useCase.execute(request);
  }
}
