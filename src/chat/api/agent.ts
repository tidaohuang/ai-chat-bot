


export async function sendChatCompletion(object: any) {
    const KEY = import.meta.env.VITE_OPENAI_KEY;

    const url = 'https://api.openai.com/v1/chat/completions';
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KEY}`,
    };

    const body = JSON.stringify(object);

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: headers,
            body: body,
        });

        if (!response.ok) {
            const errorBody = await response.text(); // or response.json() if the response is JSON
            throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorBody}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching chat completion:', error);
        throw error; // rethrow error after logging it
    }
}