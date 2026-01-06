import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { toast } from 'sonner';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  receiverId: string;
  content: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingImage: string;
  listingPrice: number;
  participantId: string;
  participantName: string;
  participantAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  messages: Message[];
}

interface MessagingContextType {
  conversations: Conversation[];
  unreadCount: number;
  getConversation: (id: string) => Conversation | undefined;
  sendMessage: (conversationId: string, content: string) => void;
  createConversation: (listingId: string, listingTitle: string, listingImage: string, listingPrice: number, sellerId: string, sellerName: string, initialMessage: string) => string;
  markAsRead: (conversationId: string) => void;
  deleteConversation: (conversationId: string) => void;
}

const MessagingContext = createContext<MessagingContextType | undefined>(undefined);

export const MessagingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState<Conversation[]>([]);

  // Load conversations from localStorage
  useEffect(() => {
    if (user) {
      const saved = localStorage.getItem(`conversations_${user.id}`);
      if (saved) {
        try {
          setConversations(JSON.parse(saved));
        } catch {
          setConversations([]);
        }
      }
    } else {
      setConversations([]);
    }
  }, [user]);

  // Save conversations to localStorage
  useEffect(() => {
    if (user && conversations.length >= 0) {
      localStorage.setItem(`conversations_${user.id}`, JSON.stringify(conversations));
    }
  }, [conversations, user]);

  // Calculate total unread count
  const unreadCount = conversations.reduce((total, conv) => total + conv.unreadCount, 0);

  const getConversation = (id: string) => {
    return conversations.find(conv => conv.id === id);
  };

  const sendMessage = (conversationId: string, content: string) => {
    if (!user) return;

    setConversations(prev => {
      const updated = prev.map(conv => {
        if (conv.id === conversationId) {
          const newMessage: Message = {
            id: Date.now().toString(),
            conversationId,
            senderId: user.id,
            senderName: user.name,
            senderAvatar: user.avatar,
            receiverId: conv.participantId,
            content,
            timestamp: new Date().toISOString(),
            read: false,
          };

          return {
            ...conv,
            lastMessage: content,
            lastMessageTime: new Date().toISOString(),
            messages: [...conv.messages, newMessage],
          };
        }
        return conv;
      });

      return updated.sort((a, b) => 
        new Date(b.lastMessageTime).getTime() - new Date(a.lastMessageTime).getTime()
      );
    });

    toast.success('Message sent');
  };

  const createConversation = (
    listingId: string,
    listingTitle: string,
    listingImage: string,
    listingPrice: number,
    sellerId: string,
    sellerName: string,
    initialMessage: string
  ): string => {
    if (!user) return '';

    // Check if conversation already exists
    const existing = conversations.find(
      conv => conv.listingId === listingId && conv.participantId === sellerId
    );

    if (existing) {
      // Send message to existing conversation
      sendMessage(existing.id, initialMessage);
      return existing.id;
    }

    // Create new conversation
    const conversationId = `conv_${Date.now()}`;
    const firstMessage: Message = {
      id: Date.now().toString(),
      conversationId,
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      receiverId: sellerId,
      content: initialMessage,
      timestamp: new Date().toISOString(),
      read: false,
    };

    const newConversation: Conversation = {
      id: conversationId,
      listingId,
      listingTitle,
      listingImage,
      listingPrice,
      participantId: sellerId,
      participantName: sellerName,
      participantAvatar: `https://api.dicebear.com/8.x/initials/svg?seed=${sellerName}`,
      lastMessage: initialMessage,
      lastMessageTime: new Date().toISOString(),
      unreadCount: 0,
      messages: [firstMessage],
    };

    setConversations(prev => [newConversation, ...prev]);
    toast.success('Message sent to seller');
    
    return conversationId;
  };

  const markAsRead = (conversationId: string) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          return {
            ...conv,
            unreadCount: 0,
            messages: conv.messages.map(msg => ({ ...msg, read: true })),
          };
        }
        return conv;
      })
    );
  };

  const deleteConversation = (conversationId: string) => {
    setConversations(prev => prev.filter(conv => conv.id !== conversationId));
    toast.success('Conversation deleted');
  };

  return (
    <MessagingContext.Provider
      value={{
        conversations,
        unreadCount,
        getConversation,
        sendMessage,
        createConversation,
        markAsRead,
        deleteConversation,
      }}
    >
      {children}
    </MessagingContext.Provider>
  );
};

export const useMessaging = () => {
  const context = useContext(MessagingContext);
  if (context === undefined) {
    throw new Error('useMessaging must be used within a MessagingProvider');
  }
  return context;
};

