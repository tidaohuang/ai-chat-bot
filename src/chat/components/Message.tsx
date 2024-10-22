

interface Props {
    fromAi: boolean,
    message: string
}

export default function Message({ fromAi, message }: Props) {

    if (fromAi) {
        return (
            <div className="bg-gray-300 p-3 rounded-lg self-start max-w-xs">
                {message}
            </div>
        )
    }

    return (
        <div className="bg-blue-500 text-white p-3 rounded-lg self-end max-w-xs">
            {message}
        </div>
    )
}