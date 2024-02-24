import { Body, Controller, Inject, Post } from "@nestjs/common";

import { AddBrandUseCase } from "./add-brand.usecase";
import { AddBrandCommand } from "./add-brand.command";
import { BrandDto } from "../../domain/brand.interface";
import { brandPath } from "../../../shared/routes";
import { AddBrandRequest } from "./add-brand.request";

@Controller(brandPath)
export class AddBrandController {
  constructor(
    @Inject(AddBrandUseCase)
    private readonly useCase: AddBrandUseCase,
  ) {}

  @Post()
  async addBrand(@Body() request: AddBrandRequest): Promise<BrandDto> {
    return await this.useCase.execute(new AddBrandCommand(request));
  }
}
