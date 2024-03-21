import { ID } from "../abstract-repository/repository.interface";

export interface IAddress {
    address: string;
    address2?: string;
    street?: string;
    city?: string;
    state?: string;
    zip?: string;
    country?: ID;
    latitude?: string;
    longitude?: string;
}