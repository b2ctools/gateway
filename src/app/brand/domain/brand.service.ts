import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { AddBrandCommand } from "../application/add-brand/add-brand.command";
import { Brand } from "./brand.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { BrandRepository } from "../infrastructure/brand-repositor.type";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdateBrandRequest } from "../application/update-brand/update-brand.request";

@Injectable()
export class BrandService {
  constructor(
    @Inject("BrandRepository")
    private readonly brandRepo: BrandRepository,
  ) {}

  private async verifyBrandName(name: string): Promise<void> {
    const existing = await this.brandRepo.getBrandByName(name);

    if (existing) {
      throw new BadRequestException(`brand name  is already taken`);
    }
  }

  async findByIdOrFail(brandId: ID) {
    const existingBrand = await this.brandRepo.findById(brandId);
    if (!existingBrand) {
      throw new BadRequestException(`Brand with id ${brandId} not found`);
    }
    return existingBrand;
  }

  async addBrand(command: AddBrandCommand): Promise<Brand> {
    await this.verifyBrandName(command.name);

    const brand: Brand = {
      id: null,
      ...command,
    };

    console.log("Adding Brand ", {
      name: brand.name,
      description: brand.description,
    });

    return await this.brandRepo.create(brand);
  }

  async removeBrand(id: ID) {
    await this.brandRepo.delete(id);
  }

  async findAllBrands(request: SearchRequest): Promise<FindAllOutput<Brand>> {
    return await this.brandRepo.findAll(request);
  }

  async updateBrand(id: ID, request: UpdateBrandRequest): Promise<Brand> {
    const { name, description } = request;
    const existingBrand = await this.findByIdOrFail(id);
    if (name) {
      await this.canUpdateName(name, existingBrand.id);
    }
    existingBrand.name = name ? name : existingBrand.name;
    existingBrand.description = description
      ? description
      : existingBrand.description;

    console.log(
      `Updating Brand - ${JSON.stringify({
        id,
        name,
        description,
      })}`,
    );
    return await this.brandRepo.persist(existingBrand);
  }

  private async canUpdateName(name: string, existingId: ID) {
    const brand = await this.brandRepo.getBrandByName(name);
    if (brand && brand.id !== existingId) {
      throw new BadRequestException(`Brand name ${name} is already taken`);
    }
  }
}
