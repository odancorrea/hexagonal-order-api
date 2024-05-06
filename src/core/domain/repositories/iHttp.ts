export default interface IHttp {
    post(url: string, data: any): Promise<any>
}