import { Inject, Injectable } from '@nestjs/common';
import { ID } from '../../../shared/abstract-repository/repository.interface';
import { BrandService } from '../../domain/brand.service';

@Injectable()
export class UpdateBrandUseCse {
  constructor(
    @Inject(BrandService)
    private readonly brandService: BrandService
  ) {}

  async execute({
    id,
    name,
    description,
  }: {
    id: ID;
    name?: string;
    description?: string;
  }) {
    return await this.brandService.updateBrand({
      id,
      name,
      description,
    });
  }
}
