import { QTable } from 'quasar';
import { TravelPackage } from 'src/entities/TravelPackage';

export const travelPackagesColumnsInterface: QTable['columns'] = [
    {
        name: 'name',
        label: 'NOME',
        align: 'left',
        headerStyle: 'min-width: 100px',
        field: (row: TravelPackage) => (row.name_travel_package ? row.name_travel_package : '')
    },
    {
        name: 'description',
        label: 'DESCRIÇÃO',
        align: 'left',
        headerStyle: 'min-width: 200px',
        field: (row: TravelPackage) => (row.description ? row.description : '')
    },
    {
        name: 'idTravelPackageType',
        label: 'TIPO',
        align: 'left',
        headerStyle: 'min-width: 125px',
        field: (row: TravelPackage) => (row.idTravelPackageType ? row.idTravelPackageType : {})
    },
    {
        name: 'start_date',
        label: 'DATA INICIAL',
        align: 'left',
        headerStyle: 'min-width: 120px',
        field: (row: TravelPackage) => (row.start_date ? row.start_date : '')
    },

    {
        name: 'end_date',
        label: 'DATA FINAL',
        align: 'left',
        headerStyle: 'min-width: 120px',
        field: (row: TravelPackage) => (row.end_date ? row.end_date : '')
    },
    {
        name: 'unit_price',
        label: 'PREÇO',
        align: 'left',
        headerStyle: 'min-width: 100px',
        field: (row: TravelPackage) => (row.unit_price ? row.unit_price : 0)
    },
    {
        name: 'idCountryOrigin',
        label: 'PAÍS ORIGEM',
        align: 'left',
        headerStyle: 'min-width: 125px',
        field: (row: TravelPackage) => (row.idCountryOrigin ? row.idCountryOrigin : {})
    },
    {
        name: 'idCountryDestination',
        label: 'PAÍS DESTINO',
        align: 'left',
        headerStyle: 'min-width: 125px',
        field: (row: TravelPackage) => (row.idCountryDestination ? row.idCountryDestination : {})
    },
    {
        name: 'functions',
        label: 'FUNÇÕES',
        align: 'center',
        headerStyle: 'min-width: 100px',
        field: () => ''
    }
];
