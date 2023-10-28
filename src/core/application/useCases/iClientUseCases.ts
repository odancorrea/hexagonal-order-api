export default interface iClientUseCases {
    create(clientInfo: any): Promise<boolean>,
    identify(clientInfo: any): Promise<boolean>
}