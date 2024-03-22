import { Inject, Injectable } from "@nestjs/common";
import { CategoryService } from "../../domain/category.service";
import { ID } from "../../../shared/abstract-repository/repository.interface";

@Injectable()
export class RemoveCategoryUseCase {
  constructor(
    @Inject(CategoryService)
    private readonly pcService: CategoryService,
  ) {}

  async execute(id: ID) {
    await this.pcService.findByIdOrFail(id);
    await this.pcService.removeCategory(id);
  }
}
