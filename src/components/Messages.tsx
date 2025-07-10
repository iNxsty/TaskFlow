import React from 'react';
import { Play, MessageCircle } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Message } from '../types';

const Messages: React.FC = () => {
  const { messages, markMessageAsRead, addMessage } = useApp();
  const [isComposing, setIsComposing] = React.useState(false);
  const [newMessage, setNewMessage] = React.useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      addMessage({
        user: {
          name: 'You',
          avatar: '👤'
        },
        message: newMessage.trim(),
        timestamp: 'now',
        unread: false
      });
      setNewMessage('');
      setIsComposing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-white font-semibold text-lg">Messages</h2>
        <button
          onClick={() => setIsComposing(true)}
          className="p-1 text-gray-400 hover:text-white transition-colors"
        >
          <MessageCircle className="w-5 h-5" />
        </button>
      </div>
      
      {isComposing && (
        <div className="mb-4 p-3 bg-gray-700 rounded-lg">
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="w-full bg-gray-600 text-white px-3 py-2 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            rows={2}
            autoFocus
          />
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleSendMessage}
              className="px-3 py-1 bg-primary-500 text-white rounded text-sm hover:bg-primary-600 transition-colors"
            >
              Send
            </button>
            <button
              onClick={() => {
                setIsComposing(false);
                setNewMessage('');
              }}
              className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-500 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {messages.map((message) => (
          <div 
            key={message.id} 
            className="flex items-start space-x-3 group hover:bg-gray-700 p-2 rounded transition-colors cursor-pointer"
            onClick={() => message.unread && markMessageAsRead(message.id)}
          >
            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-lg">
              {message.user.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <span className="text-white font-medium text-sm">
                  {message.user.name}
                </span>
                <span className="text-gray-400 text-xs">
                  {message.timestamp}
                </span>
              </div>
              <p className={`text-sm truncate ${message.unread ? 'text-white font-medium' : 'text-gray-300'}`}>
                {message.message}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {message.unread && (
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              )}
              <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Play className="w-4 h-4 text-gray-400 hover:text-white" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Messages;