import { Body, Controller, Inject, Post } from "@nestjs/common";
import { OnboardTenantRequest } from "./onboard-tenant.request";
import { onboardTenant } from "src/app/shared/routes";
import { OnboardTenantUseCase } from "./onboard-tenant.usecase";

@Controller(onboardTenant)
export class OnboardTenantController {
    constructor(
        @Inject(OnboardTenantUseCase)
        private readonly useCase: OnboardTenantUseCase
    ) {}


    @Post()
    async onboardTenant(@Body() request: OnboardTenantRequest): Promise<string> {
        console.log(request);
        return await this.useCase.onboard(request);
    }
}