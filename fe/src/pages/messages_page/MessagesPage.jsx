import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import { messagesAPI, socketConfig, getCurrentUserId, usersAPI } from "../../services/api";
import UniversalHeader from "../../components/UniversalHeader";

let socket;

function MessagesPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const messagesEndRef = useRef(null);

  // Initialize socket connection with authentication
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    // Connect socket with authentication token
    socket = io(socketConfig.url, {
      ...socketConfig.options,
      auth: {
        token: token
      }
    });

    // Socket event listeners
    socket.on('connect', () => {
      console.log('Connected to server, Socket ID:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      setError('Failed to connect to server');
    });

    socket.on('receive-message', (message) => {
      console.log('Received message:', message);
      // Add message handler that checks current state
      setMessages(prev => {
        // Get current selected contact and user from state
        const currentSelectedContact = selectedContact;
        const currentUserId = getCurrentUserId();
        
        // Only add message if it's for the currently selected contact
        if (currentSelectedContact && 
            (message.senderId === currentSelectedContact || message.receiverId === currentSelectedContact)) {
          // Check if message already exists (avoid duplicates)
          const exists = prev.some(m => m.id === message.id);
          if (exists) return prev;
          
          return [...prev, {
            id: message.id,
            senderId: message.senderId,
            receiverId: message.receiverId,
            text: message.text,
            timestamp: message.timestamp,
            isOwn: message.senderId === currentUserId
          }];
        }
        return prev;
      });
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      setError(error.message || 'Socket error occurred');
    });

    // Cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch current user and conversations
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = getCurrentUserId();
        if (!userId) {
          setError('User not found. Please log in again.');
          setLoading(false);
          return;
        }

        // Fetch current user profile
        const userData = await usersAPI.getProfile(userId);
        setCurrentUser({
          id: userData._id || userData.id,
          name: userData.name,
          avatar: userData.picture || 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg'
        });

        // Fetch conversations
        const conversations = await messagesAPI.getConversations(userId);
        
        // Transform conversations to match the expected format
        const formattedContacts = conversations.map(conv => ({
          id: conv.id,
          name: conv.name,
          avatar: conv.avatar,
          online: conv.online || false,
          lastMessage: conv.lastMessage || '',
          lastMessageTime: conv.lastMessageTime || ''
        }));

        setContacts(formattedContacts);
        
        // Auto-select first contact if available
        if (formattedContacts.length > 0 && !selectedContact) {
          setSelectedContact(formattedContacts[0].id);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load conversations. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch messages when a contact is selected
  useEffect(() => {
    const fetchMessages = async () => {
      if (!selectedContact || !currentUser) {
        setMessages([]);
        return;
      }

      try {
        setLoadingMessages(true);
        
        // Join conversation room via socket
        if (socket && socket.connected) {
          socket.emit('join-conversation', { 
            contactId: selectedContact 
          });
        }

        // Fetch messages from API
        const messagesData = await messagesAPI.getConversation(
          currentUser.id, 
          selectedContact
        );

        // Transform messages to match expected format
        const formattedMessages = messagesData.map(msg => ({
          id: msg._id || msg.id,
          senderId: typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender,
          receiverId: typeof msg.recipient === 'object' ? (msg.recipient._id || msg.recipient.id) : msg.recipient,
          text: msg.content,
          timestamp: new Date(msg.createdAt).toLocaleTimeString('en-US', { 
            hour: 'numeric', 
            minute: '2-digit' 
          }),
          isOwn: (typeof msg.sender === 'object' ? (msg.sender._id || msg.sender.id) : msg.sender) === currentUser.id
        }));

        setMessages(formattedMessages);
      } catch (err) {
        console.error('Error fetching messages:', err);
        setError('Failed to load messages. Please try again.');
      } finally {
        setLoadingMessages(false);
      }
    };

    fetchMessages();
  }, [selectedContact, currentUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim() || !selectedContact || !currentUser || !socket) {
      return;
    }

    const messageData = {
      receiverId: selectedContact,
      content: messageText.trim(),
      listing: null // Can be updated later if needed
    };

    // Send message via socket
    socket.emit('send-message', messageData);

    // Optimistically add message to UI (will be confirmed when received from server)
    const tempMessage = {
      id: `temp-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: selectedContact,
      text: messageText.trim(),
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      isOwn: true
    };

    setMessages(prev => [...prev, tempMessage]);
  };

  const selectedContactData = contacts.find(c => c.id === selectedContact);

  if (loading) {
    return (
      <div className="bg-gray-50 h-screen w-screen overflow-hidden">
        <UniversalHeader />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-gray-500">Loading conversations...</div>
        </div>
      </div>
    );
  }

  if (error && !currentUser) {
    return (
      <div className="bg-gray-50 h-screen w-screen overflow-hidden">
        <UniversalHeader />
        <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
          <div className="text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 h-screen w-screen overflow-hidden flex flex-col">
      <UniversalHeader />
      <div className="flex h-[calc(100vh-4rem)]">
        <ContactsList 
          contacts={contacts} 
          selectedContact={selectedContact} 
          onContactSelect={setSelectedContact}
          loading={loading}
        />
        <ChatWindow 
          selectedContact={selectedContactData} 
          messages={messages} 
          onSendMessage={handleSendMessage}
          loading={loadingMessages}
          messagesEndRef={messagesEndRef}
        />
      </div>
    </div>
  );
}

export default MessagesPage;

function ContactsList({ contacts, selectedContact, onContactSelect, loading }) {
  if (loading) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
        </div>
        <div className="flex-1 flex items-center justify-center">
          <div className="text-gray-500 text-center px-4">No conversations yet. Start a conversation!</div>
        </div>
      </div>
    );
  }

  return (
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
              <img 
                src={contact.avatar} 
                alt={contact.name} 
                className="w-12 h-12 rounded-full"
                onError={(e) => {
                  e.target.src = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg';
                }}
              />
              <div className={`absolute bottom-0 right-0 w-3 h-3 ${contact.online ? 'bg-green-500' : 'bg-gray-400'} rounded-full border-2 border-white`}></div>
            </div>
            <div className="ml-3 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900 truncate">{contact.name}</h3>
                <span className="text-xs text-gray-500 ml-2 flex-shrink-0">{contact.lastMessageTime}</span>
              </div>
              <p className="text-sm text-gray-600 truncate">{contact.lastMessage}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ChatWindow({ selectedContact, messages, onSendMessage, loading, messagesEndRef }) {
  const [messageInput, setMessageInput] = useState('');

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      onSendMessage(messageInput);
      setMessageInput('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (!selectedContact) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500 bg-white">
        Select a conversation to start messaging
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src={selectedContact.avatar} 
            alt={selectedContact.name} 
            className="w-10 h-10 rounded-full"
            onError={(e) => {
              e.target.src = 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg';
            }}
          />
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
        {loading && messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-gray-500">Loading messages...</div>
          </div>
        ) : (
          <>
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
          </>
        )}
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
}
