/**
 * Expected model to be passed in the /SupportTicket/UpdatTicketAsync
 */
export default interface UpdateTicketModel {
    id: number;
    isReadByAdmin: boolean;
    adminReply: string;
}