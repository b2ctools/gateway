import { Body, Controller, Inject, Post } from "@nestjs/common";
import { planPath } from "src/app/shared/routes";
import { SetResourcesUseCase } from "./set-resources.usecase";
import { SetResourcesRequest } from "./set-resources.request";

@Controller(planPath)
export class ResourceController {
  constructor(
    @Inject(SetResourcesUseCase)
    private readonly useCase: SetResourcesUseCase,
  ) {}

  @Post("set-resources")
  async setResources(@Body("") request: SetResourcesRequest) {
    await this.useCase.execute(request);
    return { message: "Resources set successfully" };
  }
}
