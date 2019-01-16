import { IGetResourcesParamsExternal, IGetResourcesParamsInternal, IGetSitesParamsExternal, IGetSitesParamsInternal } from "src/interfaces/site";

import { CLocationIDs } from "src/interfaces/core";

export class CGetResourcesParams implements IGetResourcesParamsInternal {
    constructor(
      public LocationIDs: CLocationIDs,
      public SessionTypeIDs: number,
      public StartDateTime: Date,
      public EndDateTime: Date
    ) {}
    public toString(): IGetResourcesParamsExternal {
      return Object.assign(
        {
          EndDateTime: this.EndDateTime.toJSON(),
          SessionTypeIDs: this.SessionTypeIDs,
          StartDateTime: this.StartDateTime.toJSON()
        },
        this.LocationIDs.toString()
      );
    }
  }

  export class CGetSitesParams implements IGetSitesParamsInternal {
    [key: string]: any;
    constructor(public SearchText: string, public RelatedSiteID: string) {}
    public toString(): IGetSitesParamsExternal {
      const getSitesParams: IGetSitesParamsExternal = {};
      for (const key of Object.keys(this)) {
        if (this[key] != null && this[key] !== "") {
          getSitesParams[key] = this[key];
        }
      }
      return getSitesParams; // {
      // RelatedSiteID: this.RelatedSiteID,
      // SearchText: this.SearchText
      // };
    }
  }
