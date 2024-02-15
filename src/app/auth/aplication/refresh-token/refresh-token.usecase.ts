import { Inject, Injectable } from "@nestjs/common";
import { IRefreshToken } from "./refresh-token.request";
import { RefreshTokenService } from "../../domain/refresh-token.service";

@Injectable()
export class RefreshTokenUseCase {
  constructor(
    @Inject(RefreshTokenService)
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async execute(request: IRefreshToken) {
    console.log("Attemp to refresh token");
    return await this.refreshTokenService.refreshToken(request);
  }
}
