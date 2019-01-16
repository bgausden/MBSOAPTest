export interface ILiability {
    IsReleased: boolean;
    AgreementDate?: Date;
    ReleasedBy: string;
  }
    
export interface IClient {
    Notes: string;
    AppointmentGenderPreference: string;
    IsCompany: boolean;
    LiabilityRelease: boolean;
    EmergencyContactInfoName: string;
    EmergencyContactInfoRelationship: string;
    EmergencyContactInfoPhone: string;
    PromotionalEmailOptIn: boolean;
    CreationDate: Date;
    Liability: ILiability;
    UniqueID: string;
    ID: string;
    FirstName: string;
    LastName: string;
    Email: string;
    EmailOptIn: boolean;
    AddressLine1: string;
    City: string;
    State: string;
    PostalCode: string;
    Country: string;
    MobilePhone: string;
    HomePhone: string;
    WorkPhone: string;
    WorkExtension: string;
    BirthDate: Date;
    FirstAppointmentDate: Date;
    PhotoURL: string;
    IsProspect: boolean;
    ContactMethod: string;
    MobileProvider?: number;
    ReferredBy: string;
    Username: string;
    YellowAlert: string;
    RedAlert: string;
  }
  