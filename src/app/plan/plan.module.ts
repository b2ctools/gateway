import { Module } from "@nestjs/common";
import { getPlanRepo } from "./infrastructure/plan.repo-provider";
import { AddPlanController } from "./application/add-plan/add-plan.controller";
import { AddPlanUseCase } from "./application/add-plan/add-plan.usecase";
import { PlanService } from "./domain/plan.service";
import { SearchPlanController } from "./application/search-plan/search-plan.controller";
import { SearchPlanUseCase } from "./application/search-plan/search-plan.usecase";
import { RemovePlanController } from "./application/remove-plan/remove-plan.controller";
import { RemovePlanUseCase } from "./application/remove-plan/remove-plan.usecase";
import { UpdatePlanController } from "./application/update-plan/update-plan.controller";
import { UpdatePlanUseCse } from "./application/update-plan/update-plan.usecase";
import { FindOnePlanController } from "./application/find-one-plan/find-one-plan.controller";
import { FindOnePlanUseCase } from "./application/find-one-plan/find-one-plan.usecase";
import { ResourceModule } from "../resource/resource.module";
import { SetResourcesUseCase } from "./application/set-resources/set-resources.usecase";
import { ResourceController } from "./application/set-resources/set-resources.controller";

@Module({
  imports: [ResourceModule],
  controllers: [
    AddPlanController,
    SearchPlanController,
    RemovePlanController,
    UpdatePlanController,
    FindOnePlanController,
    ResourceController,
  ],
  providers: [
    AddPlanUseCase,
    SearchPlanUseCase,
    RemovePlanUseCase,
    UpdatePlanUseCse,
    PlanService,
    getPlanRepo(),
    FindOnePlanUseCase,
    SetResourcesUseCase,
    SetResourcesUseCase,
  ],
  exports: [PlanService],
})
export class PlanModule {}
