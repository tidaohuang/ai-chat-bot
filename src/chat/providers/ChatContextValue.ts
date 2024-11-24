export type ChatMessage = {
    role: 'user' | 'system' | 'assistant',
    content: string
}

export interface ChatContextValue {

    // openai api loading indicator
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;

    // user input message
    message: string;
    setMessage: React.Dispatch<React.SetStateAction<string>>;

    // chat messages
    messages: ChatMessage[],
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;

    // set openai api body json
    jsonData: any,
    setJsonData: React.Dispatch<React.SetStateAction<any>>;
    error: string | null,
    setError: React.Dispatch<React.SetStateAction<string | null>>;

    // 
    handleSend: (userMessage: string, promptMessage: string) => void;
}