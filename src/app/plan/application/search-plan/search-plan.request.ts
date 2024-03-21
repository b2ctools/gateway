import { SearchRequest } from "src/app/shared/filters-and-request/base.request";

export interface SearchPlanRequest extends SearchRequest {
    isCustom?: boolean;
}