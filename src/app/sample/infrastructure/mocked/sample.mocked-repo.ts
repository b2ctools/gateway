
import { Injectable } from '@nestjs/common';
import { MockedRepository } from '../../../shared/abstract-repository/mocked-repository';
import { SampleMockedEntity } from './sample.mocked-entity';
import { Sample } from '../../domain/sample.interface';

@Injectable()
export class SampleMockedRepository extends MockedRepository<
  SampleMockedEntity,
  Sample
> {
  domainToEntity(d: Sample): SampleMockedEntity {
    const entity = new SampleMockedEntity();

    entity.name = d.name;
    entity.description = d.description;
    entity.tenantId = d.tenantId;
    entity.images = d.images;
    entity.price = d.price;
    entity.stock = d.stock;
    entity.unit = d.unit;
    entity.weight = d.weight;
    entity.categoryId = d.categoryId;
    entity.storeId = d.storeId;
    entity.brandId = d.brandId;
    entity.countryId = d.countryId;
    entity.hidden = d.hidden;
    entity.locations = d.locations;
    return entity;
  }

  entityToDomain(e: SampleMockedEntity): Sample {
    return {
      id: e._id,
      name: e.name,
      description: e.description,
      tenantId: e.tenantId,
      images: e.images,
      price: e.price,
      stock: e.stock,
      unit: e.unit,
      weight: e.weight,
      categoryId: e.categoryId,
      storeId: e.storeId,
      brandId: e.brandId,
      countryId: e.countryId,
      hidden: e.hidden,
      locations: e.locations,
    };
  }

  async getSampleByName(name: string): Promise<Sample> {
    const samples = await this.findAll({});
    if (samples.length === 0) return null;
    const filtered = samples.filter((s) => s.name === name);
    return filtered.length > 0 ? filtered.shift() : null;
  }

}
