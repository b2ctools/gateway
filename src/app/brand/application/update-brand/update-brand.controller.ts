import { Body, Controller, Inject, Param, Patch } from "@nestjs/common";
import { brandPath } from "../../../shared/routes";
import { BrandDto } from "../../domain/brand.interface";
import { UpdateBrandUseCse } from "./update-brand.usecase";
import { UpdateBrandRequest } from "./update-brand.request";
import { ID } from "src/app/shared/abstract-repository/repository.interface";

@Controller(brandPath)
export class UpdateBrandController {
  constructor(
    @Inject(UpdateBrandUseCse)
    private readonly useCase: UpdateBrandUseCse,
  ) {}

  @Patch(":id")
  async updateBrand(@Param("id") id: ID, @Body() request: UpdateBrandRequest): Promise<BrandDto> {
    return await this.useCase.execute(id, request);
  }
}
