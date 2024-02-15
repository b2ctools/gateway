import { BadRequestException, Inject, Injectable } from "@nestjs/common";

import { AddBrandCommand } from "../application/add-brand/add-brand.command";
import { Brand } from "./brand.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { BrandRepository } from "../infrastructure/brand-repositor.type";
import { SearchRequest } from "../../shared/base.request";

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
      tenantId: null,
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

  async findAllBrands(request: SearchRequest): Promise<Brand[]> {
    return await this.brandRepo.findAll(request);
  }

  async updateBrand({
    id,
    name,
    description,
  }: {
    id: ID;
    name?: string;
    description?: string;
  }): Promise<Brand> {
    const existingBrand = await this.findByIdOrFail(id);

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
}
