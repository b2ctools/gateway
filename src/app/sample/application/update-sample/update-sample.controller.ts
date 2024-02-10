
import { Body, Controller, Inject, Patch } from "@nestjs/common";
import { samplePath } from "../../../shared/routes";
import { sampleToDto } from "../../domain/sample.interface";
import { UpdateSampleUseCse } from "./update-sample.usecase";
import { UpdateSampleRequest } from "./update-sample.request";

@Controller(samplePath)
export class UpdateSampleController {
    constructor(
        @Inject(UpdateSampleUseCse)
        private readonly useCase: UpdateSampleUseCse,
    ){}

    @Patch()
    async updateSample(@Body() request: UpdateSampleRequest){
        const pc = await this.useCase.execute(request)
        return sampleToDto(pc);
    }
}
