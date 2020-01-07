export enum SenderType {
    user = 'user',
    bot = 'bot'
}

export interface BaseMessage {
    sender: SenderType
    userId: string //userId: MongoUser['_id']
    text: string
    date: Date
}