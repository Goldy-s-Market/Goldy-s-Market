import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useId } from "react";
import io from "socket.io-client";

const SOCKET_URL = "";
let socket;


function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    socket = io(SOCKET_URL);

    // SOCKET EVENT LISTENERS GO HERE
    socket,on('connect', () => {
      console.log('Connected to server')
    })
  }, []);

  // Fetch data from backend
  useEffect(() => {

    // TODO fetch user data from backend
    setCurrentUser({
      id: 1,
      name: 'You',
      avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
    })

    setContacts([
      {
        id: 2,
        name: "Lynda Miller",
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg',
        online: true,
        lastMessage: 'That sounds fair. Could we meet...',
        lastMessageTime: '2m ago'
      },
      {
        id: 3,
        name: 'Mike Johnson',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg',
        online: false,
        lastMessage: 'Thanks for the quick response!',
        lastMessageTime: '1h ago'
      },
      {
        id: 4,
        name: 'Emily Rodriguez',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg',
        online: true,
        lastMessage: 'Is the textbook still available?',
        lastMessageTime: '3h ago'
      },
      {
        id: 5,
        name: 'David Lee',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg',
        online: false,
        lastMessage: 'Perfect condition, just as described',
        lastMessageTime: '1d ago'
      },
      {
        id: 6,
        name: 'Alex Thompson',
        avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-9.jpg',
        online: true,
        lastMessage: 'Let me know when you\'re free',
        lastMessageTime: '2d ago'
      }
    ]);

    setSelectedContact(2);
  }, []);


  //Fetch messages when a contact is selected
  useEffect(() => {
    if(selectedContact && currentUser){
      //Fetch data asynchronously from backed.


      //Emit socket event to join conversation room
      socket.emit('join-conversation', {useId: currentUser.id, contactId: selectedContact});


      //Mock messages
      setMessages([
        {
          id: 1,
          senderId: 2,
          text: 'Hi! Is the iPad you posted still available?',
          timestamp: '10:30 AM',
          isOwn: false
        },
        {
          id: 2,
          senderId: 1,
          text: 'Yes, it\'s still available! It\'s the 2021 model in great condition.',
          timestamp: '10:32 AM',
          isOwn: true
        },
        {
          id: 3,
          senderId: 2,
          text: 'Awesome! How much are you asking for it?',
          timestamp: '10:35 AM',
          isOwn: false
        },
        {
          id: 4,
          senderId: 1,
          text: 'I\'m asking $350, but I\'m flexible. The original price was $600.',
          timestamp: '10:37 AM',
          isOwn: true
        }
      ]);
    }
  }, [selectedContact, currentUser]);

  const handleSendMessage = () => {
    if (messageInput.trim() && selectedContact){
      const newMessage = {
        id: Date.now(),
        senderId: currentUser?.id,
        receiverId: selectedContact,
        text: messageInput,
        timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
        isOwn: true
      };


      //TODO Send message to backend

      socket.emit('send-message', newMessage);


      setMessages(prev => [...prev, newMessage]);
    }
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);
  return (
    
    <div className="bg-gray-50 h-screen overflow-hidden">
      {/*Header */}
      <header id="header" className="bg-white border-b border=gray-200 h-16 flex items-center px-6 shadow-sm">
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2">
            {/*Logo goes here */}
            <div></div>
            <span className="text-xl font-bold text-gray-900">Goldy's Market</span>
          </div>
          <nav class="flex items-center space-x-6">
            {/*Add routes to pages */}
                <span class="text-gray-700 hover:text-maroon font-medium cursor-pointer">Marketplace</span>
                <span class="text-maroon font-medium cursor-pointer">Messages</span>
                <span class="text-gray-700 hover:text-maroon font-medium cursor-pointer">My Listings</span>
          </nav>
        </div>
        <div class="ml-auto flex items-center space-x-4">
            <button class="relative p-2 text-gray-600 hover:text-maroon">
                <i class="text-lg" data-fa-i2svg=""><svg class="svg-inline--fa fa-bell" aria-hidden="true" focusable="false" data-prefix="far" data-icon="bell" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" data-fa-i2svg=""><path fill="currentColor" d="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z"></path></svg></i>
                <span class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
            </button>
            <button class="p-2 text-gray-600 hover:text-maroon">
                <i class="text-lg" data-fa-i2svg=""><svg class="svg-inline--fa fa-gear" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="gear" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z"></path></svg></i>
            </button>
            <img src="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg" alt="Profile" class="w-8 h-8 rounded-full"/>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        <ContactsList contacts={contacts} selectedContact={selectedContact} onContactSelect={setSelectedContact}/>
        <ChatWindow selectedContact={selectedContactData} messages={messages} onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default MessagesPage;

function ContactsList({contacts, selectedContact, onContactSelect}){
  return(
    <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
      </div>
      <div className="flex-1 overflow-y-auto">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            onClick={() => onContactSelect(contact.id)}
            className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer ${
              selectedContact === contact.id ? 'border-l-4 border-red-800 bg-gray-50' : ''
            }`}
          >
            <div className="relative">
              <img src={contact.avatar} alt={contact.name} className="w-12 h-12 rounded-full" />
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${contact.online ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
            </div>
            <div className="ml-3 flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">{contact.name}</h3>
                <span className="text-xs text-gray-500">{contact.lastMessageTime}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

  );
};

function ChatWindow({ selectedContact, messages, onSendMessage }){
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef(null);

  function handleSendMessage(){
    if (messageInput.trim()){
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  function handleKeyPress(e){
    if(e.key === 'Enter'){
      handleSendMessage();
    }
  };

  if(!selectedContact){
    return(
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-white">
        Select a conversation to start messaging
      </div>
    );
  }

  return(
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img src={selectedContact.avatar} alt={selectedContact.name} className="w-10 h-10 rounded-full" />
          <div>
            <h3 className="text-lg font-medium text-gray-900">{selectedContact.name}</h3>
            <p className={`text-sm ${selectedContact.online ? 'text-green-600' : 'text-gray-500'}`}>
              {selectedContact.online ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-600 hover:text-red-800 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:text-red-800 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
          <button className="p-2 text-gray-600 hover:text-red-800 hover:bg-gray-100 rounded-full">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
            <div className={`${
              message.isOwn 
                ? 'bg-red-800 text-white' 
                : 'bg-white border border-gray-200 text-gray-900 shadow-sm'
            } rounded-2xl px-4 py-2 max-w-xs`}>
              <p>{message.text}</p>
              <span className={`text-xs ${message.isOwn ? 'text-gray-200' : 'text-gray-500'} mt-1 block`}>
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-1 relative">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="w-full px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
            />
          </div>
          <button
            onClick={handleSendMessage}
            className="bg-red-800 text-white p-3 rounded-full hover:bg-opacity-90 transition-colors"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};


