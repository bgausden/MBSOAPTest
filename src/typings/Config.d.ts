import { TServiceMethod } from "../mb_soap";
import { TServices } from "../types/core";
import { TSiteID } from "../types/site";

/* tslint:disable */
interface Config {
  DEBUG: boolean;
  DEBUG_REQUESTS: boolean
  MBAPIKey: string;
  LocationID: string;
  SiteIDs: TSiteID;
  UserName: string;
  UserPassword: string;
  StaffID: string;
  service: TServices;
  serviceMethod: TServiceMethod;
}
