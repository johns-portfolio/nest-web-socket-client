import React, { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

const url = 'http://localhost:3001'

const App = () => {
  const [newMessage, setNewMessage] = useState('')
  const [messages, setMessages] = useState<string[]>([])
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    console.log('🔥 useEffect')
    const newSocket = io(url)
    setSocket(newSocket)

    newSocket.on('receive_message', (data) => {
      setMessages((prev) => prev.concat(data))
    })

    return () => {
      newSocket.close()
    }
  }, [])

  return (
    <div className="bg-gray-500 h-screen py-10 px-4">
      <form
        className="flex flex-col gap-2 bg-white p-4"
        onSubmit={(e) => {
          e.preventDefault()
          socket?.emit('send_message', newMessage)
          setNewMessage('')
        }}
      >
        <input
          type="text"
          className=""
          name="message"
          value={newMessage}
          placeholder="Message"
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="">
          Send
        </button>
      </form>

      {messages.map((c, i) => (
        <div key={i} className="flex flex-col">
          {c}
        </div>
      ))}
    </div>
  )
}

export default App
