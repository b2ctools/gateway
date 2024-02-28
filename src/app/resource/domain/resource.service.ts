import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { ResourceRepository } from "../infrastructure/resource-repository.type";
import { AddResourceCommand } from "../application/add-resource/add-resource.command";
import { Resource } from "./resource.interface";
import { ID } from "../../shared/abstract-repository/repository.interface";
import { SearchRequest } from "../../shared/base.request";
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
      throw new BadRequestException(`Resource with id ${resourceId} not found`);
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

  async findAllResources(request: SearchRequest) {
    return await this.resourceRepo.findAll(request);
  }

  async updateResource(
    id: ID,
    request: UpdateResourceRequest,
  ): Promise<Resource> {
    const { name, description, module, permissions } = request;
    const existingResource = await this.findByIdOrFail(id);

    existingResource.name = name ? name : existingResource.name;
    existingResource.description = description
      ? description
      : existingResource.description;
    existingResource.module = module ? module : existingResource.module;
    existingResource.permissions = permissions
      ? permissions
      : existingResource.permissions;

    console.log(
      `Updating Resource - ${JSON.stringify({
        id,
        name,
        description,
      })}`,
    );
    return await this.resourceRepo.persist(existingResource);
  }
}
