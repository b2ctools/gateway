import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { SampleRepository } from "../infrastructure/sample-repository.type";
import { AddSampleCommand } from "../application/add-sample/add-sample.command";
import { Sample } from "./sample.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdateSampleRequest } from "../application/update-sample/update-sample.request";

@Injectable()
export class SampleService {
  constructor(
    @Inject("SampleRepository")
    private readonly sampleRepo: SampleRepository,
  ) {}

  private async verifySampleName(name: string): Promise<void> {
    const existing = await this.sampleRepo.getSampleByName(name);

    if (existing) {
      throw new BadRequestException(`Sample name  is already taken`);
    }
  }

  async findByIdOrFail(sampleId: ID) {
    const existingSample = await this.sampleRepo.findById(sampleId);
    if (!existingSample) {
      throw new BadRequestException(`Sample with id ${sampleId} not found`);
    }
    return existingSample;
  }

  async addSample(command: AddSampleCommand) {
    await this.verifySampleName(command.name);

    const sample: Sample = {
      id: null,
      ...command,
    };

    return await this.sampleRepo.create(sample);
  }

  async removeSample(id: ID) {
    await this.sampleRepo.delete(id);
  }

  async findAllSamples(request: SearchRequest): Promise<FindAllOutput<Sample>> {
    return await this.sampleRepo.findAll(request);
  }

  async updateSample(id: ID, request: UpdateSampleRequest): Promise<Sample> {
    const {
      name,
      description,
      images,
      price,
      stock,
      unit,
      weight,
      categoryId,
      storeId,
      brandId,
      countryId,
      locations,
    } = request;
    const existingSample = await this.findByIdOrFail(id);
    if (name) {
      await this.canUpdateName(name, id);
    }
    const sampleToUpdate = {
      ...existingSample,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(images ? { images } : {}),
      ...(price ? { price } : {}),
      ...(stock ? { stock } : {}),
      ...(unit ? { unit } : {}),
      ...(weight ? { weight } : {}),
      ...(categoryId ? { categoryId } : {}),
      ...(storeId ? { storeId } : {}),
      ...(brandId ? { brandId } : {}),
      ...(countryId ? { countryId } : {}),
      ...(locations ? { locations } : {}),
    };

    console.log(`Updating Sample - ${JSON.stringify({ sampleToUpdate })}`);
    return await this.sampleRepo.persist(sampleToUpdate);
  }

  private async canUpdateName(name: string, existingId: ID) {
    const sample = await this.sampleRepo.getSampleByName(name);
    if (sample && sample.id !== existingId) {
      throw new BadRequestException(`Sample name ${name} is already taken`);
    }
  }
}
