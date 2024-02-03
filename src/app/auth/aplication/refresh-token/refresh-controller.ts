import { Body, Controller, Inject, Post } from "@nestjs/common";
import { RefreshTokenUseCase } from "./refresh-token.usecase";
import { RefreshTokenRequest } from "./refresh-token.request";

@Controller()
export class RefreshController {
    constructor(
        @Inject(RefreshTokenUseCase)
        private readonly useCase : RefreshTokenUseCase,
    ){}

    @Post('/refresh-token')
    async refreshToken(@Body() request: RefreshTokenRequest) {
        return await this.useCase.execute(request);
    }
}