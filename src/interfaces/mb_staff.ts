interface IGetStaffResponse {
    GetStaffResult: IGetStaffResult;
  }

  interface IGetStaffResult {
    Status: string;
    ErrorCode: number;
    XMLDetail: string;
    ResultCount: number;
    CurrentPageIndex: number;
    TotalPageCount: number;
    StaffMembers: IStaffMembers;
  }

  interface IStaffMembers {
    Staff: IStaff[];
  }

  export interface IStaff {
    SortOrder: number;
    AppointmentTrn: boolean;
    ReservationTrn: boolean;
    IndependentContractor: boolean;
    AlwaysAllowDoubleBooking: boolean;
    ProviderIDs?: any;
    ID: string;
    Name: string;
    FirstName: string;
    LastName: string;
    isMale: boolean;
    Address?: string;
    State?: string;
    Country?: string;
    City?: string;
    PostalCode?: string;
    ImageURL?: string;
    Bio?: string;
    MobilePhone?: string;
    HomePhone?: string;
    Email?: string;
  }
