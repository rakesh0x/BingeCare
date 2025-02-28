"use client"


export const ChatBox = () => {
    return (
        <div className="min-h-screen flex items-center justify-center border-b bg-black-900">
            <div 
            id='chat-container'
            className="p-6 rounded-lg shadow-lg">
                <h1>Chat Room</h1>
                <input 
                type='message'
                placeholder='Send your Message'>
                </input>
                <button id="send" 
                    className="rounded-xl w-5 cursor-pointer flex-col">
                        Send Message
                    </button>
            </div>
        </div>
    )
}