import { Inject, Injectable } from "@nestjs/common";
import { CountryService } from "src/app/country/domain/country.service";
import { ID } from "src/app/shared/abstract-repository/repository.interface";
import { IAddress } from "src/app/shared/address/address.interface";

export interface AddressValidationResult {
  success: boolean;
  errors: string[];
}

@Injectable()
export class AddressValidator {
  private errors: string[] = [];
  constructor(
    @Inject(CountryService)
    private readonly countryService: CountryService
  ) {}

  private async validateCountry(countryId: ID): Promise<boolean> {
    if (countryId) {
      try {
        await this.countryService.findByIdOrFail(countryId);
      } catch (error) {
        this.errors.push(error);
        return false;
      }
    }
    return true;
  }
  async validate(address: IAddress): Promise<AddressValidationResult> {
    await this.validateCountry(address.country);

    return {
      success: this.errors.length === 0,
      errors: this.errors,
    };
  }
}
