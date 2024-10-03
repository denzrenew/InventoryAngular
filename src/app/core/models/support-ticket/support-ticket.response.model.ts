/**
 * Response ticket model from /SupportTicket/GetAllSupportTicket
 */
export default interface AllSupportTicketResponse {
    id: number;
    userId: number;
    subject: string;
    content: string;
    isReadByAdmin: boolean | null,
    adminReply: string;
    createdDate: Date;
    lastModified: Date | null;
    firstName: string;
    lastName: string;
    email: string;
}