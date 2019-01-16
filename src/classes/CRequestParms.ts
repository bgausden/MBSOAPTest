import BluebirdPromise from "bluebird";
import { Client } from "soap";
import { IRequestParms } from "../interfaces/core";
import { TServiceMethod, TServices } from "../types/core";
export class CRequestParms implements IRequestParms {
    public error: any;
    public request: any;
    public service: TServices;
    public serviceMethod: TServiceMethod;
    public soapClientPromise: any;
    constructor(service: TServices, serviceMethod: TServiceMethod, error: any, request: any, soapClientPromise: BluebirdPromise<Client>|undefined) {
        this.service = service;
        this.serviceMethod = serviceMethod;
        this.error = undefined;
        this.request = undefined;
        this.soapClientPromise = undefined;
    }
}
