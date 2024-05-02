export default interface IOrderQueue {
    sendToQueue(message: string, queue: string): void
}