import ReactMarkdown from 'react-markdown';

interface Props {
    fromAi: boolean,
    message: string
}

export default function Message({ fromAi, message }: Props) {
    const messageClass = fromAi 
        ? "bg-gray-300 p-3 rounded-lg self-start max-w-xs break-words"
        : "bg-blue-500 text-white p-3 rounded-lg self-end max-w-xs break-words";

    const markdownClass = fromAi
        ? "prose prose-base max-w-none text-base"
        : "prose prose-base prose-invert max-w-none text-base whitespace-pre-wrap";

    return (
        <div className={messageClass}>
            <ReactMarkdown className={markdownClass}>
                {message}
            </ReactMarkdown>
        </div>
    );
}