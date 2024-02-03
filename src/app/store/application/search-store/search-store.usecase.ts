import { Inject, Injectable } from "@nestjs/common";
import { StoreService } from "../../domain/store.service";
import { SearchRequest, sanitazeSearchQueryParams } from "../../../shared/base.request";

@Injectable()
export class SearchStoreUseCase {
    constructor(
        @Inject(StoreService)
        private readonly StoreService: StoreService,
    ){}

    async execute(request: SearchRequest){
        return await this.StoreService.findAllStores(sanitazeSearchQueryParams<SearchRequest>(request))
    }
}