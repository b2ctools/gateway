import { Inject, Injectable } from "@nestjs/common";
import { BrandService } from "../../domain/brand.service";
import { AddBrandCommand } from "./add-brand.command";

@Injectable()
export class AddBrandUseCase {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService,
  ) {}

  async addBrand(command: AddBrandCommand) {
    return await this.brandService.addBrand(command);
  }
}
