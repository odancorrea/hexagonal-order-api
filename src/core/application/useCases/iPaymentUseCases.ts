export default interface iPaymentUseCases {
    getStatus(id: number): Promise<String | boolean>,
    setStatus(id: number, paymentInfo: any): Promise<boolean>,
}