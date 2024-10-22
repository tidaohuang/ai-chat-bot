import { createContext, ReactNode, useContext, useState } from "react";
import { ChatContextValue, ChatMessage } from "./ChatContextValue";
import { sendChatCompletion } from "../api/agent";




const ChatContext = createContext<ChatContextValue | null>(null);


export const useChatContext = () => {
    const ctx = useContext(ChatContext);
    if (ctx === null) {
        throw new Error('ChatContext is null');
    }
    return ctx;
};



type ChatContextProviderProps = {
    children: ReactNode
}

export default function ChatContextProvider({ children }: ChatContextProviderProps) {

    // openai api loading
    const [loading, setLoading] = useState(false);

    // message from user input
    const [message, setMessage] = useState('');

    // chat messages between users and ai
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    // json object uploaded by user
    const [jsonData, setJsonData] = useState<any>(null);
    // error message if updload json failed
    const [error, setError] = useState<string | null>(null);

    const handleSend = (message: string) => {
        if (!message) {
            return;
        }

        // combine message
        const updatedMessages: ChatMessage[] = [...messages, {
            role: 'user',
            content: message
        }]

        // update state
        setMessages(updatedMessages);
        setMessage('');
        setLoading(true);

        // modify api POST request http body
        const object = { ...jsonData };
        object['messages'] = updatedMessages;

        // call api here
        sendChatCompletion(object)
            .then(response => {
                if ('choices' in response) {
                    const reply = response.choices[0].message.content;
                    const repliedMessages: ChatMessage[] = [...updatedMessages, {
                        role: 'system',
                        content: reply
                    }]
                    setMessages(repliedMessages);
                }
            })
            .catch(error => console.error('Failed to send request:', error))
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <ChatContext.Provider value={{
            loading, setLoading,
            message, setMessage,
            messages, setMessages,
            jsonData, setJsonData,
            error, setError,
            handleSend
        }} >
            {children}
        </ChatContext.Provider>
    )
}
