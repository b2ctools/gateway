import { IsNumber, IsOptional } from "class-validator";

export class PriceRequest implements IPrice {
  @IsNumber()
  current: number;

  @IsOptional()
  @IsNumber()
  previous?: number;
}

export class WeightRequest implements IWeight {
  @IsOptional()
  @IsNumber()
  gross: number;

  @IsOptional()
  @IsNumber()
  net: number;
}

export type ISampeImages = string[];
export type IPrice = {
  current: number;
  previous?: number;
};
export const allowedUnits = ["Kg", "Lb", "Oz", "U"] as const; // Ensure const assertion
export type IUnit = "Kg" | "Lb" | "Oz" | "U";
export type IWeight = {
  gross: number;
  net: number;
};
export type ILocations = string[];
