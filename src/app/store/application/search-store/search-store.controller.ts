import { Controller, Get, Inject, Query, UseGuards } from "@nestjs/common";
import { SearchStoreUseCase } from "./search-store.usecase";
import { StoreDto, sortable, storeToDto } from "../../domain/store.interface";
import { storePath } from "../../../shared/routes";
// import { RoleChecking } from "../../../auth/domain/middleware/role.guard";
// import { UserRole } from "../../../user/domain/user.interface";
// import { Roles } from "../../../auth/domain/middleware/roles.decorator";
import { SearchOutput, SearchRequest } from "../../../shared/base.request";
@Controller(storePath)
export class SearchStoreController {
  constructor(
    @Inject(SearchStoreUseCase)
    private readonly useCase: SearchStoreUseCase,
  ) {}

  // @UseGuards(RoleChecking)
  // @Roles([UserRole.USER])
  @Get()
  async findAllStores(
    @Query() request: SearchRequest,
  ): Promise<SearchOutput<StoreDto>> {
    const stores = (await this.useCase.execute(request)).map((s) =>
      storeToDto(s),
    );
    return {
      count: stores.length,
      data: stores,
      sortable,
    };
  }
}
