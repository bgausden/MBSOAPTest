import {expect} from "chai";
import "mocha";
import { config } from "node-config-ts";
import { ISoapServiceMethod } from "soap";
import { IGetStaffResult, IStaff, IStaffMembers } from "../interfaces/mb_staff";
import { makeRequest, setRequest } from "../request";
import { TLocationIDs, TSiteID } from "../types/site";

