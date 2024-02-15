import { Body, Controller, Inject, Post } from "@nestjs/common";

import { AddBrandUseCase } from "./add-brand.usecase";
import { AddBrandCommand } from "./add-brand.command";
import { brandToDto } from "../../domain/brand.interface";
import { brandPath } from "../../../shared/routes";
import { AddBrandRequest } from "./add-brand.request";

@Controller(brandPath)
export class AddBrandController {
  constructor(
    @Inject(AddBrandUseCase)
    private readonly useCase: AddBrandUseCase,
  ) {}

  @Post()
  async addBrand(@Body() request: AddBrandRequest) {
    const brand = await this.useCase.addBrand(new AddBrandCommand(request));
    return brandToDto(brand);
  }
}
