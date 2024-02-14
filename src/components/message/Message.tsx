import styles from "./Message.module.css"

export interface IMessageProps{
    message: string;
    datetime: string;
    author: string;
}

const Message: React.FC<IMessageProps> = ({message, datetime, author}) => {
    return(
        <div>
            <h2>From: {author} </h2>
            <h4>Time: {datetime}</h4>
            <p>{message}</p>
        </div>
    )
}

export default Message;