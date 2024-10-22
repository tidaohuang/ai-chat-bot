import ChatRoom from "./chat/ChatRoom"
import ChatContextProvider from "./chat/providers/ChatContextProvider"

function App() {

	return (
		<ChatContextProvider>
			<ChatRoom />
		</ChatContextProvider>
	)
}

export default App
