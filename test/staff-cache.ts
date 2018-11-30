import { expect } from "chai";
import "mocha";
import { config } from "node-config-ts";
import { ISoapServiceMethod } from "soap";
import {
  IGetStaffResult,
  IStaff,
  IStaffMembers
} from "../src/interfaces/mb_staff";
import { makeRequest, setRequest } from "../src/request";
import { TLocationIDs, TSiteID } from "../src/types/site";
