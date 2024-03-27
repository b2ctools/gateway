import { Module } from "@nestjs/common";
import { CountryModule } from "../country/country.module";
import { AddressValidator } from "./domain/address-validator.service";

@Module({
    imports: [CountryModule],
    controllers: [],
    providers: [AddressValidator],
    exports: [AddressValidator],
})
export class AddressModule {}
