export class ChatMessage {
    $key?: string;
    email?: string;
    userName?: string;
    message?: string;
    reciverEmail?:string;
    timeSent?: Date = new Date();
}
