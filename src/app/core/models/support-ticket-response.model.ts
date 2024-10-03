/**
 * Response model from the Support Ticket API
 */
export interface SupportTicketResponse {
  id: number;
  userId: number;
  subject: string;
  content: string;
  isReadByAdmin: boolean | null;
  adminReply: string;
  createdDate: Date;
  lastModified: Date | string | null;
}