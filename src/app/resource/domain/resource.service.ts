import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ResourceRepository } from "../infrastructure/resource-repository.type";
import { AddResourceCommand } from "../application/add-resource/add-resource.command";
import { Resource } from "./resource.interface";
import { FindAllOutput, ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/filters-and-request/base.request";
import { UpdateResourceRequest } from "../application/update-resource/update-resource.request";

@Injectable()
export class ResourceService {
  constructor(
    @Inject("ResourceRepository")
    private readonly resourceRepo: ResourceRepository,
  ) {}

  private async verifyResourceName(name: string): Promise<void> {
    const existing = await this.resourceRepo.getResourceByName(name);

    if (existing) {
      throw new BadRequestException(`Resource name  is already taken`);
    }
  }

  async findByIdOrFail(resourceId: ID) {
    const existingResource = await this.resourceRepo.findById(resourceId);
    if (!existingResource) {
      throw new BadRequestException(
        `Permission with id ${resourceId} not found`,
      );
    }
    return existingResource;
  }

  async addResource(command: AddResourceCommand) {
    await this.verifyResourceName(command.name);

    const resource: Resource = {
      id: null,
      ...command,
    };

    return await this.resourceRepo.create(resource);
  }

  async removeResource(id: ID) {
    await this.resourceRepo.delete(id);
  }

  async findAllResources(request: SearchRequest): Promise<FindAllOutput<Resource>> {
    return await this.resourceRepo.findAll(request);
  }

  async updateResource(
    id: ID,
    request: UpdateResourceRequest,
  ): Promise<Resource> {
    const { name, description, module, permissions } = request;
    const existingResource = await this.findByIdOrFail(id);

    if (name) {
      await this.canUpdateName(name, existingResource.id);
    }
    
    const resourceToUpdate = {
      ...existingResource,
      ...(name ? { name } : {}),
      ...(description ? { description } : {}),
      ...(module ? { module } : {}),
      ...(permissions ? { permissions } : {}),
    }

    console.log(`Updating Resource - ${JSON.stringify(request)}`);
    return await this.resourceRepo.persist(resourceToUpdate);
  }

  private async canUpdateName(name: string, existingId: ID) {
    const resource = await this.resourceRepo.getResourceByName(name);
    if (resource && resource.id !== existingId) {
      throw new BadRequestException(`Resource name ${name} is already taken`);
    }
  }
}
