import { useEffect, useState } from 'react';
import Messages from '../../services/MessagesService';
import styles from './MessageList.module.css'
import Message, { IMessageProps } from '../../components/message/Message';

const messagesC = new Messages("http://146.185.154.90:8000/messages");
const messSend = new Messages('http://146.185.154.90:8000/messages?datetime=2024-02-13T15:43:02.734Z')
const MessageList: React.FC = () => {

    const [messages, setMessages] = useState<IMessageProps[]>([{author: '', message: "", datetime: ''}])
    const [inputValues, setInputValues] = useState({ author: "", message: "" });

    const inputHandler: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const { name, value } = e.target;
        if (name === "author") {
            setInputValues(prevState => {
                return ({ ...prevState, author: value })
            })
        } else {
            setInputValues(prevState => {
                return ({ ...prevState, message: value })
            })
        }
    }
    const formSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();
        const response = await messagesC.sendMessage(inputValues.author, inputValues.message);
        console.log(response);
        
    }
    const fetchData = async () => {
        try {
            const response = await messSend.getMessages();
            const messagesFromApi = response.data;
            setMessages(messagesFromApi);
        } catch (error) {
            console.error("Error fetching messages:", error);
        }
    };
    let interval: NodeJS.Timer;
    const startInterval = () => {
        if (!interval) {
            interval = setInterval(fetchData, 2000);
        }
        console.log(interval);

    }
    useEffect(startInterval, [])

    // const chack = async () => {
    //     const resp = await messagesC.sendMessage("Chika", "Sssssssssssss");
    //     console.log(resp);
    // }


    return (
        <div>
            <form onSubmit={formSubmit}>
                <input type="text" name="author" value={inputValues.author} onChange={(e) => inputHandler(e)} />
                <input type="text" name="message" value={inputValues.message} onChange={(e) => inputHandler(e)} />
                <button type='submit'>send</button>
            </form>
            {
                < Message message={messages[messages.length-1].message} datetime={messages[messages.length-1].datetime} author={messages[messages.length-1].author} />
            }
            {/* <button onClick={chack} >click</button> */}
            <button onClick={fetchData} >get messages</button>
        </div>
    )
}

export default MessageList;