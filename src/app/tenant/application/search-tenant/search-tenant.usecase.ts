
import { Inject, Injectable } from "@nestjs/common";
import { TenantService } from "../../domain/tenant.service";
import { SearchRequest } from "../../../shared/base.request";

@Injectable()
export class SearchTenantUseCase {
    constructor(
        @Inject(TenantService)
        private readonly tenantService: TenantService,
    ){}

    async execute(request: SearchRequest){
        return await this.tenantService.findAllTenants(request)
    }
}
