import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { CategoryRepository } from "../infrastructure/category-repository.type";
import { AddCategoryCommand } from "../application/add-category/add-category.command";
import {
  Category,
  CategoryTree,
} from "./category.interface";
import {
  FindAllOutput,
  ID,
} from "../../shared/abstract-repository/repository.interface";
import { SearchCategoryRequest } from "../application/search-category/search-category.request";
import { SearchSubCategoryRequest } from "../application/sub-category/sub-category.request";
import { domainEntityFromTenantVerification } from "src/app/auth/domain/middleware/access-control";

export interface JsonCategoryItem {
  name: string;
  subcategories?: JsonCategoryItem[];
}
@Injectable()
export class CategoryService {
  constructor(
    @Inject("CategoryRepository")
    private readonly pcRepo: CategoryRepository,
  ) {}

  private async verifyCategoryName(name: string): Promise<void> {
    const existingPC = await this.pcRepo.getCategoryByName(name);

    if (existingPC) {
      throw new BadRequestException(
        `Product-Category name ${name} is already taken`,
      );
    }
  }

  private async verifyParentCategory(id: ID): Promise<void> {
    if (id && id != "0") {
      const existingPC = await this.pcRepo.findById(id);
      if (!existingPC) {
        throw new BadRequestException(
          `Product-Category PARENT with id ${id} specified do not exists.`,
        );
      }
    }
  }

  async addCategory(command: AddCategoryCommand) {
    await this.verifyCategoryName(command.name);
    const pc: Category = {
      id: null,
      status: "active",
      ...command,
    };

    await this.verifyParentCategory(command.parent);

    console.log(`Ading Product Category`, {
      name: pc.name,
      description: pc.description,
      parent: pc.parent,
    });
    return await this.pcRepo.create(pc);
  }

  async categoriesFromParent(request: SearchSubCategoryRequest) {
    const categories = await this.pcRepo.getCategoryByParentId(request);

    return await Promise.all(
      categories.map(async (c) => {
        return {
          ...c,
          countSubs: (
            await this.pcRepo.getCategoryByParentId({
              parent: c.id,
            })
          ).length,
        };
      }),
    );
  }

  async removeCategory(id: ID) {
    const existingPC = await this.pcRepo.findById(id);
    if (!existingPC) {
      throw new BadRequestException(
        `Product Category with id ${id} do not exist.`,
      );
    }

    const subcategories = await this.pcRepo.getCategoryByParentId({
      parent: existingPC.id,
    });
    if (subcategories.length > 0) {
      throw new BadRequestException(
        `Product Category ${existingPC.name} can not be removed. It has subcategories.`,
      );
    }

    await this.pcRepo.delete(id);
  }

  private async getHierarchy(parent: ID) {
    if (!parent) {
      throw new BadRequestException(
        `Error getting hierarchy, parent must be defined.`,
      );
    }

    const getCategoryHierarchy = (
      categories: CategoryTree[],
      parentId: ID,
    ): CategoryTree[] => {
      const filteredCategories = categories.filter(
        (category) => category.parent === parentId,
      );
      if (filteredCategories.length === 0) {
        return [];
      }
      const result: CategoryTree[] = [];
      filteredCategories.forEach((category) => {
        const subcategories = getCategoryHierarchy(categories, category.id);
        if (subcategories.length > 0) {
          category.subcategories = subcategories;
        }
        // delete category.tenantId;
        result.push(category);
      });
      return result;
    };

    // const categories: Category[] = await this.pcRepo.findAll({});
    const { data: categories } = await this.pcRepo.findAll({});

    return getCategoryHierarchy(categories, parent);
  }

  async findAllCategories(
    request: SearchCategoryRequest,
  ): Promise<FindAllOutput<Category | CategoryTree>> {
    // this.pcRepo.logItems();
    const { count, data: _categories } = await this.pcRepo.findAll(request);
    let categories = _categories as Category[];

    const sub = !!request.sub;
    categories = sub
      ? await Promise.all(
          categories.map(async (c) => {
            const childs = await this.pcRepo.getCategoryByParentId({
              parent: c.id,
            });
            return {
              ...c,
              sub: childs.length,
            };
          }),
        )
      : categories;

    return {
      count,
      data: categories,
    };
  }

  async insertCategoriesFromJson(json: string, tenantId: ID) {
    const result: Category[] = [];

    const saveCategories = async (
      categories: JsonCategoryItem[],
      parent: ID = "0",
    ) => {
      for await (const category of categories) {
        const savedCategory = await this.addCategory(
          new AddCategoryCommand({
            ...category,
            parent,
            tenantId,
          }),
        );
        if (category.subcategories && category.subcategories.length > 0) {
          await saveCategories(category.subcategories, savedCategory.id);
        }
        result.push(savedCategory);
      }
    };

    let categoriesToSave: JsonCategoryItem[] = [];
    try {
      // categoriesToSave = !json ? jsonCategories : JSON.parse(json);
      categoriesToSave = JSON.parse(json);
    } catch (error) {
      throw new BadRequestException(
        "Error inserting Product Category from json file. " + error,
      );
    }

    await saveCategories(categoriesToSave);

    return this.getHierarchy("0");
  }

  async findByIdOrFail(pcId: ID) {
    const existingPC = await this.pcRepo.findById(pcId);
    if (!existingPC) {
      throw new BadRequestException(
        `Product Category with id ${pcId} not found`,
      );
    }
    domainEntityFromTenantVerification(existingPC);

    return existingPC;
  }

  async updateCategory({
    id,
    name,
    description,
    parent,
  }: {
    id: ID;
    name?: string;
    description?: string;
    parent?: ID;
  }): Promise<Category> {
    const existingPC = await this.findByIdOrFail(id);
    domainEntityFromTenantVerification(existingPC);
    if (name) {
      await this.canUpdateName(name, existingPC.id);
    }

    if (parent) {
      await this.canUpdateParent(parent, existingPC.id);
    }

    existingPC.name = name ? name : existingPC.name;
    existingPC.description = description ? description : existingPC.description;
    existingPC.parent = parent ? parent : existingPC.parent;

    console.log(
      `Updating Product Category - ${JSON.stringify({
        id,
        name,
        description,
        parent,
      })}`,
    );
    return await this.pcRepo.persist(existingPC);
  }

  private async canUpdateParent(parent: ID, existingId: ID) {
    if (parent === existingId) {
      throw new BadRequestException(
        `Product Category can not be its own parent`,
      );
    }

    const existingPC = await this.findByIdOrFail(parent);
    domainEntityFromTenantVerification(existingPC);
  }

  private async canUpdateName(name: string, existingId: ID) {
    const pc = await this.pcRepo.getCategoryByName(name);
    domainEntityFromTenantVerification(pc);
    if (pc && pc.id !== existingId) {
      throw new BadRequestException(
        `Product Category name ${name} is already taken`,
      );
    }
  }
}
