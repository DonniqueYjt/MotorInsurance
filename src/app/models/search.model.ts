export interface Manufacturer {
    ManufacturerID: string;
    Manufacturername: string;
    IsBike: string;
    IsCar: string;
    IsActive: string;
    IsMisc: string;
    IsPCV: string;
    IsGCV: string;
}

export interface Vehicle {
    VehicleID: string;
    VehicleName: string;
    ManufacturerID: string;
    VehicleType: string;
    IsActive: string;
    undefined: string;
}

export interface Variant {
    VariantID: string;
    VehicleID: string;
    VariantName: string;
    FuelID: string;
    VehicleCC: string;
    SeatingCapacity: string;
    ExShowroomPrice: string;
    IsActive: string;
    MasterVehicleCode: string;
    No_of_Wheels: string;
}

export interface RTO {
    RTOID: string;
    RTOName: string;
    RTOCode: string;
    IsActive: string;
    FullRtoCode: string;
}

export class SearchObject {
    manufacturer: Manufacturer;
    model: Vehicle;
    variant: Variant;
    vehicleType: number;
    manufacturerYear: number;
    rto:RTO;
    fuelType: string;
    mobile: number;
    email: string;
    coverType:number;
}