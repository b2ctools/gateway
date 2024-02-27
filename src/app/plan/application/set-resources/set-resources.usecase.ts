import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { PlanService } from "../../domain/plan.service";
import { ResourceService } from "src/app/resource/domain/resource.service";
import { SetResourcesRequest } from "./set-resources.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Injectable()
export class SetResourcesUseCase {
  constructor(
    @Inject(PlanService)
    private readonly planService: PlanService,

    @Inject(ResourceService)
    private readonly resourceService: ResourceService,
  ) {}

  private async validateResources(resourceIds: ID[]) {
    await Promise.all(
      resourceIds.map(async (id) => {
        const resource = await this.resourceService.findByIdOrFail(id);
        if (!resource) {
          throw new BadRequestException(`Resource with id ${id} not found`);
        }
      }),
    );
  }

  async execute(request: SetResourcesRequest) {
    await this.validateResources(request.resources);
    await this.planService.setResources(request);
  }
}
