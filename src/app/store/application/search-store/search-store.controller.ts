import { Controller, Get, Inject, Query } from "@nestjs/common";
import { SearchStoreUseCase } from "./search-store.usecase";
import { StoreDto, sortable, storeToDto } from "../../domain/store.interface";
import { storePath } from "../../../shared/routes";
// import { RoleChecking } from "../../../auth/domain/middleware/role.guard";
// import { UserRole } from "../../../user/domain/user.interface";
// import { Roles } from "../../../auth/domain/middleware/roles.decorator";
import { SearchOutput, SearchRequest } from "../../../shared/filters-and-request/base.request";
import { Scope } from "src/app/account/domain/account.interface";
import { allowedForScope } from "src/app/auth/domain/middleware/access-control";
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
    allowedForScope([Scope.MANAGER, Scope.OWNER]);
    const { count, data } = await this.useCase.execute(request);
    const stores = data.map((s) => storeToDto(s));
    return {
      count,
      data: stores,
      sortable,
    };
  }
}
