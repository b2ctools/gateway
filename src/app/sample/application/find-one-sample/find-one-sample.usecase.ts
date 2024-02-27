import { Inject, Injectable } from "@nestjs/common";
import { ID } from "../../../shared/abstract-repository/repository.interface";
import { SampleService } from "../../domain/sample.service";
import { SampleDto, sampleToDto } from "../../domain/sample.interface";
import { TenantService } from "../../../tenant/domain/tenant.service";

@Injectable()
export class FindOneSampleUseCase {
  constructor(
    @Inject(SampleService)
    private readonly sampleService: SampleService,

    @Inject(TenantService)
    private readonly tenantService: TenantService,
  ) {}
  async execute(id: ID): Promise<SampleDto> {
    const sample = await this.sampleService.findByIdOrFail(id);
    const tenantRef = this.tenantService.getTenantRef(sample.tenantId);
    return sampleToDto(sample, tenantRef);
  }
}
