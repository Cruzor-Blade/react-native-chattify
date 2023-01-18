export type Message = {
    id: string;
    message: string;
    sender: string;
    time: string;
    isReplyTo?: string;
};