import { BadRequestException } from "@nestjs/common";
import * as _ from "lodash";
import { genId } from "../utils/gen-id";
import { IDomain } from "./entities/domain";
import { MockedEntity } from "./entities/mocked-entity";
import { AppRepository, FindAllOutput, ID } from "./repository.interface";
import {
  IOrder,
  SearchRequest,
  applyFiltersFromRequest,
} from "../filters-and-request/base.request";
import { User } from "../../user/domain/user.interface";

interface HashMap<T> {
  [key: string]: T;
}

// TODO: restringir acceso a información entre tenants. (... todos los métodos)

/**
 * This is a class to implement the handling
 * of all mocked entities
 */

export abstract class MockedRepository<
  TMockedEntity extends MockedEntity,
  TDomain extends IDomain,
> implements AppRepository<TMockedEntity, TDomain>
{
  protected elements: HashMap<TMockedEntity> = {};

  logItems() {
    const items = Object.values(this.elements);
    console.log("==============================================");
    console.log(items);
    console.log("==============================================");
  }

  async findById(id: ID): Promise<TDomain> {
    if (!id) return null;
    const existingItem = this.elements[id];
    if (existingItem) return this.entityToDomain(this.elements[id]);
    return null;
  }

  async getEntityId(id: ID): Promise<TMockedEntity> {
    if (!id) return null;
    const existingItem = this.elements[id];
    if (existingItem) return this.elements[id];
    return null;
  }

  private sort({
    sortBy,
    sortOrder,
    items,
  }: {
    sortBy?: string;
    sortOrder?: IOrder;
    items: TMockedEntity[];
  }) {
    if (!items || items.length === 0) return [];
    if (!sortBy || sortBy === "") return items;

    const result = _.orderBy(items, [sortBy], [sortOrder]);

    console.log("====================");
    console.log(result);
    console.log("====================");

    return result;
  }

  private paginating({
    take,
    skip,
    items,
  }: {
    take?: number;
    skip?: number;
    items: TMockedEntity[];
  }) {
    if (!items || items.length === 0) {
      return [];
    }
    const from = !skip ? 0 : skip;
    const to = (!take ? 10 : take) + from;
    const result = items.slice(from, to);

    return result;
  }

  private fromToDate({
    fromDate,
    toDate,
    fieldName,
    items,
  }: {
    fromDate?: string;
    toDate?: string;
    fieldName: string;
    items: TMockedEntity[];
  }) {
    if (fromDate && toDate) {
      const fieldDate = fieldName || "createdAt";
      return items.filter((e) => {
        const from = new Date(fromDate);
        const to = new Date(toDate);
        return e[fieldDate] >= from && e[fieldDate] <= to;
      });
    }

    return items;
  }

  async findAll(request: SearchRequest): Promise<FindAllOutput<TDomain>> {
    if (Object.keys(this.elements).length > 0) {
      const { sortBy, sortOrder, take, skip, fromDate, toDate, dateFieldName } =
        request;

      let results = Object.values(this.elements);

      // applying filter field-string-value
      const { filters } = request;
      results = applyFiltersFromRequest(results, filters);

      // sorting data
      results = sortBy
        ? this.sort({
            sortBy,
            sortOrder,
            items: results,
          })
        : results;

      // from-to Date
      results = this.fromToDate({
        fromDate,
        toDate,
        fieldName: dateFieldName,
        items: results,
      });

      // total of result without pagination
      const count = results.length;

      // paginating data
      results =
        take || skip
          ? this.paginating({
              take,
              skip,
              items: results,
            })
          : results;

      const data = results.map((item) => this.entityToDomain(item));
      return {
        count,
        data,
      };
    }

    return {
      count: 0,
      data: [],
    };
  }

  async exist(id: ID): Promise<boolean> {
    return !!(await this.findById(id));
  }

  async create(d: TDomain): Promise<TDomain> {
    const id = genId((d as unknown as User).email);
    const e = this.domainToEntity(d);
    e._id = id;
    this.elements[id] = e.toCreate();
    return this.entityToDomain(e);
  }

  async persist(d: TDomain): Promise<TDomain> {
    const { id, ...info } = d;

    const existing = await this.getEntityId(id);
    if (!existing) {
      throw new BadRequestException(
        `Error trying to update a not found entity - ${JSON.stringify(d)}`,
      );
    }

    const updatedE = {
      ...existing,
      ...info,
    };

    this.elements[id] = updatedE;
    return this.entityToDomain(updatedE);
  }

  async delete(id: ID): Promise<void> {
    const exist = await this.exist(id);

    if (!exist)
      throw new BadRequestException(`Entity with ${id} do not exist.`);

    if (exist) {
      delete this.elements[id];
    }
  }

  domainToEntity(d: TDomain): TMockedEntity {
    console.log(d);
    throw new Error("Method not implemented.");
  }

  entityToDomain(e: TMockedEntity): TDomain {
    console.log(e);
    throw new Error("Method not implemented.");
  }
}
