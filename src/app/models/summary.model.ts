import { InsertNomineeDetails } from './request/insert-nominee-details.model';
import { InsertVehicleDetails } from './request/insert-vehicle-details.model';
import { InsertVisitorDetails1Request, InsertVisitorDetailsRequest } from './request/insert-visitor-details-request.model';
export class Summary {
    owner: InsertVisitorDetailsRequest;
    address: InsertVisitorDetails1Request;
    nominee: InsertNomineeDetails;
    vehicle: InsertVehicleDetails;
}
