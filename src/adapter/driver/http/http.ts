import axios from "axios"

export default class Http {
    async post (url: string, data: any): Promise<any> {
        const result = await axios.post(url, data)
        return result.data
    }
}