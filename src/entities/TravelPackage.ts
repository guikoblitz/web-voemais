import { Country } from './Country';
import { TravelPackageType } from './TravelPackageType';

export class TravelPackage {
    id_travel_pack: string;

    id_travel_package_type: string;

    idTravelPackageType?: TravelPackageType;

    id_country_origin: string;

    idCountryOrigin?: Country;

    idCountryDestination?: Country;

    id_country_destination: string;

    name_travel_package: string;

    description: string;

    image: string;

    promotion: boolean;

    start_date: Date;

    end_date?: Date;

    unit_price?: number;

    created_at: Date;

    updated_at: Date;
}
