/**
 * The passed model when searching for support tickets
 */
export default interface SupportTicketFilterModel {
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    subject?: string | null;
    content?: string | null;
}