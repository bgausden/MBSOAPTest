export interface IReminder  {
    [key:string]:any
    ID: string;
    ClientFirstName: string;
    Status: string;
    SessionType: string;
    StaffFirstName: string;
    StartDateTime: Date
}

export class CReminder implements IReminder {
    constructor(
        public ID: string,
        public ClientFirstName: string,
        public Status: string,
        public SessionType: string,
        public StaffFirstName: string,
        public StartDateTime: Date
    ){}
}