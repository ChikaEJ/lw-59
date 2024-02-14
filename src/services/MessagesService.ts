import axios from "axios";
import { IMessageProps } from "../components/message/Message";
class Messages{
    url: string;
    constructor(url: string){
        this.url = url;
    }
    async getMessages () {
        const data = await axios.get<IMessageProps[]>(this.url);
        return data;
    }
    async sendMessage (author: string, message: string) {
        const data = new URLSearchParams({message: message, author: author});        
        const response = await axios.post(this.url,data)
        return response.data;
    }
}

export default Messages;
