import S from "string";
import { IReminder } from "../interfaces/IReminder";
export class CReminder implements IReminder {
    constructor(public ID: string, public ClientFirstName: string, public Status: string, public SessionType: string, public StaffFirstName: string, public StartDateTime: Date) { }
    public toReminderString(): string {
        return `Hi ${this.ClientFirstName} this is a reminder for your appointment tomorrow (${this.StartDateTime.toLocaleDateString("en-US", { weekday: "long" })}) at ${this.StartDateTime.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric"
        })} with ${this.StaffFirstName}.`;
    }
    /**
     * toWhatsAppURI
     */
    public toWhatsAppURI(): string {
        const reminderText = S(this.toReminderString()).escapeHTML().s;
        return S(reminderText).wrapHTML("a", {
            href: `whatsapp://send?text=${reminderText}`
        }).s;
    }
}
