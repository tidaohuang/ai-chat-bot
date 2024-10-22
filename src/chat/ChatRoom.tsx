import { useState } from "react";
import Message from "./components/Message";
import LoadingDots from "./components/LoadingDots";
import { useChatContext } from "./providers/ChatContextProvider";

export default function ChatRoom() {

    const { 
        loading,
        message, setMessage,
        messages,
        jsonData, setJsonData,
        error, setError,
        handleSend
    } = useChatContext();

    const [settingsOpen, setSettingsOpen] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (!file) return;

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const text = e.target?.result as string;
                const data = JSON.parse(text);
                setJsonData(data);
                setError(null); // Clear any previous errors
            } catch (err) {
                setError('Invalid JSON file.');
                setJsonData(null);
            }
        };

        reader.readAsText(file);
    };

    const toggleSettings = () => {
        setSettingsOpen(!settingsOpen);
    };

    const handleKeyDown = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            handleSend(message);
        }
    };

    return (
        // global container
        <div className="flex items-center justify-center bg-slate-800">
            <div className="flex flex-col h-screen w-screen p-4 bg-gray-100
                md:w-8/12">

                <button className="close-button text-xl" type="button" onClick={toggleSettings}>
                    <div>
                        <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24"
                            aria-hidden="true" height="1em" width="1em"
                            xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M4 6h16M4 12h16M4 18h7"></path>
                        </svg>
                    </div>
                </button>

                {settingsOpen && (
                    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-start items-center z-50">
                        <div className="bg-white w-screen p-6 h-full shadow-lg md:w-[500px]"
                            style={{ overflowY: 'auto' }}
                        >
                            <h2 className="text-xl font-bold mb-4">AI Chat Settings</h2>
                            {/* Settings form */}
                            <div>
                                <label className="block mb-2">API POST Body:</label>
                                <input
                                    type="file"
                                    accept=".json"
                                    onChange={handleFileChange}
                                    className="mb-4"
                                />
                                {error && <p className="text-red-500">{error}</p>}
                                {jsonData && (
                                    <div>
                                        <h2 className="font-bold">Uploaded JSON Data:</h2>
                                        <pre className="bg-gray-100 p-4 rounded" 
                                            style={{ width: '450px', overflow: 'auto' }}>{JSON.stringify(jsonData, null, 2)}</pre>
                                    </div>
                                )}
                            </div>
                            <button className="bg-red-500 text-white p-2 rounded mt-2" onClick={toggleSettings}>
                                Close
                            </button>
                        </div>
                    </div>
                )}

                <div className="flex-1 overflow-auto">
                    {/* Chat messages */}
                    <div className="flex flex-col space-y-4">

                        {messages.map((m, index) => (
                            <Message key={index}
                                message={m.content}
                                fromAi={m.role === 'system'}
                            />
                        ))}

                        {loading && (
                            <div className="bg-gray-300 p-3 rounded-lg self-start max-w-xs">
                                <LoadingDots />
                            </div>
                        )}
                    </div>
                </div>
                <div className="mt-4 flex">
                    <input
                        type="text"
                        placeholder="Type a message..."
                        className="border border-gray-300 p-3 rounded-l-lg w-full"
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        value={message}
                    />
                    <button className="bg-blue-500 text-white p-3 rounded-r-lg" onClick={() => handleSend(message)}>
                        Send
                    </button>
                </div>
            </div>
        </div>


    )
}
