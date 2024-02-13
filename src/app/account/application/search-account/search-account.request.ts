import { extend } from "joi";
import { SearchRequest } from "src/app/shared/base.request";

export interface SearchAccountRequest extends SearchRequest {
    userId: string;
}