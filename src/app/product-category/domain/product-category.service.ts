import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ProductCategoryRepository } from '../infrastructure/product-category-repository.type';
import { AddProductCategoryCommand } from '../application/add-product-category/add-product-category.command';
import {
  ProductCategory,
  ProductCategoryTree,
} from './product-category.interface';
import { ID } from '../../shared/abstract-repository/repository.interface';
import { DEFAULT_TENANT, ctxSrv } from '../../shared/context.service';
import { SearchProductCategoryRequest } from '../application/search-product-categories/search-product-category.request';

// import { jsonCategories } from './json-categories';
// console.log(JSON.stringify(jsonCategories))
export interface JsonProductCategoryItem {
  name: string;
  subcategories?: JsonProductCategoryItem[];
}
@Injectable()
export class ProductCategoryService {
  constructor(
    @Inject('ProductCategoryRepository')
    private readonly pcRepo: ProductCategoryRepository
  ) {}

  private async verifyProductCategoryName(name: string): Promise<void> {
    const existingPC = await this.pcRepo.getProductCategoryByName(name);

    if (existingPC) {
      throw new BadRequestException(
        `Product-Category name ${name} is already taken`
      );
    }
  }

  private async verifyParentCategory(id: ID): Promise<void> {
    if (id && id != '0') {
      const existingPC = await this.pcRepo.findById(id);
      if (!existingPC) {
        throw new BadRequestException(
          `Product-Category PARENT with id ${id} specified do not exists.`
        );
      }
    }
  }

  async addProductCategory(command: AddProductCategoryCommand) {
    await this.verifyProductCategoryName(command.name);
    const pc: ProductCategory = {
      id: null,
      tenantId: null,
      ...command,
    };

    await this.verifyParentCategory(command.parent);

    console.log(`Ading Product Category ${JSON.stringify(command)}`);
    return await this.pcRepo.create(pc);
  }

  async productCategoriesFromParent({
    parent,
    tree = false,
  }: {
    parent: ID;
    tree?: boolean;
  }) {
    return tree
      ? await this.getHierarchy(parent)
      : await this.pcRepo.getProductCategoryByParentId(parent);
  }

  async removeProductCategory(id: ID) {
    const existingPC = await this.pcRepo.findById(id);
    if (!existingPC) {
      throw new BadRequestException(
        `Product Category with id ${id} do not exist.`
      );
    }

    const subcategories = await this.productCategoriesFromParent({
      parent: existingPC.id,
    });
    if (subcategories.length > 0) {
      throw new BadRequestException(
        `Product Category with id ${id} can not be removed. It has subcategories.`
      );
    }

    await this.pcRepo.delete(id);
  }

  private async getHierarchy(parent: ID) {
    if (!parent) {
      throw new BadRequestException(
        `Error getting hierarchy, parent must be defined.`
      );
    }

    const getCategoryHierarchy = (
      categories: ProductCategoryTree[],
      parentId: ID
    ): ProductCategoryTree[] => {
      const filteredCategories = categories.filter(
        (category) => category.parent === parentId
      );
      if (filteredCategories.length === 0) {
        return [];
      }
      const result: ProductCategoryTree[] = [];
      filteredCategories.forEach((category) => {
        const subcategories = getCategoryHierarchy(categories, category.id);
        if (subcategories.length > 0) {
          category.subcategories = subcategories;
        }
        delete category.tenantId;
        result.push(category);
      });
      return result;
    };

    const categories: ProductCategory[] = await this.pcRepo.findAll({});

    return getCategoryHierarchy(categories, parent);
  }

  async findAllProductCategories(request: SearchProductCategoryRequest) {
    const tree = !!request.tree;
    // this.pcRepo.logItems();
    const categories = await this.pcRepo.findAll(request);
    return tree ? await this.getHierarchy('0') : categories;
  }

  async insertCategoriesFromJson(json: string) {
    const result: ProductCategory[] = [];

    const saveCategories = async (
      categories: JsonProductCategoryItem[],
      parent: ID = '0'
    ) => {
      for await (const category of categories) {
        const savedCategory = await this.addProductCategory(
          new AddProductCategoryCommand({
            ...category,
            parent,
          })
        );
        if (category.subcategories && category.subcategories.length > 0) {
          await saveCategories(category.subcategories, savedCategory.id);
        }
        result.push(savedCategory);
      }
    };

    let categoriesToSave: JsonProductCategoryItem[] = [];
    try {
      // categoriesToSave = !json ? jsonCategories : JSON.parse(json);
      categoriesToSave = JSON.parse(json);
    } catch (error) {
      throw new BadRequestException(
        'Error inserting Product Category from json file. ' + error
      );
    }

    await saveCategories(categoriesToSave);

    return this.getHierarchy('0');
  }

  async findByIdOrFail(pcId: ID){
    const existingPC = await this.pcRepo.findById(pcId)
    if (!existingPC){
      throw new BadRequestException(`User with id ${pcId} not found`);
    }
    return existingPC;
  }

  async updateProductCategory({
    id,
    name,
    description,
    parent,
  }: {
    id: ID;
    name?: string;
    description?: string;
    parent?: ID;
  }): Promise<ProductCategory> {
    const existingPC = await this.findByIdOrFail(id);

    existingPC.name = name ? name : existingPC.name;
    existingPC.description = description ? description : existingPC.description;
    existingPC.parent = parent ? parent : existingPC.parent;

    console.log(
      `Updating Product Category - ${JSON.stringify({
        id,
        name,
        description,
        parent,
      })}`
    );
    return await this.pcRepo.persist(existingPC);
  }

  async onApplicationBootstrap() {
    ctxSrv.setTenantId(DEFAULT_TENANT);
    await this.addProductCategory({
      name: 'name1',
      parent: '0',
    });

    const pc2 = await this.addProductCategory({
      name: 'name2',
      parent: '0',
    });

    const pc3 = await this.addProductCategory({
      name: 'name3',
      parent: '0',
    });

    await this.updateProductCategory({
      id: pc3.id,
      parent: pc2.id,
    });

    // await this.findAllProductCategories({ tree: null, sortBy: 'name', sortOrder: 'desc' });
  }
}
