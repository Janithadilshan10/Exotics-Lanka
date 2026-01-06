import { useState, useEffect, useRef } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMessaging, Conversation } from "@/contexts/MessagingContext";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  MessageCircle,
  Send,
  Trash2,
  Search,
  ArrowLeft,
  Clock,
  CheckCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

const Inbox = () => {
  const { user, isAuthenticated } = useAuth();
  const { conversations, getConversation, sendMessage, markAsRead, deleteConversation } = useMessaging();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const conversationIdFromUrl = searchParams.get('id');
  
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(
    conversationIdFromUrl
  );
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (conversationIdFromUrl) {
      setSelectedConversationId(conversationIdFromUrl);
    }
  }, [conversationIdFromUrl]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selectedConversationId, conversations]);

  // Mark as read when conversation is opened
  useEffect(() => {
    if (selectedConversationId) {
      markAsRead(selectedConversationId);
    }
  }, [selectedConversationId, markAsRead]);

  const selectedConversation = selectedConversationId
    ? getConversation(selectedConversationId)
    : null;

  const filteredConversations = conversations.filter(conv =>
    conv.listingTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.participantName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim() || !selectedConversationId) return;

    sendMessage(selectedConversationId, messageInput.trim());
    setMessageInput("");
  };

  const handleDeleteConversation = (id: string) => {
    deleteConversation(id);
    if (selectedConversationId === id) {
      setSelectedConversationId(null);
    }
  };

  const quickReplies = [
    "Is this still available?",
    "Can I schedule a test drive?",
    "What's your best price?",
    "Can you send more photos?",
    "I'm interested. Let's discuss details.",
  ];

  const formatTime = (timestamp: string) => {
    try {
      return formatDistanceToNow(new Date(timestamp), { addSuffix: true });
    } catch {
      return "Just now";
    }
  };

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-20">
        <div className="h-[calc(100vh-5rem)] flex">
          {/* Conversation List Sidebar */}
          <div
            className={cn(
              "w-full md:w-96 border-r border-border bg-card flex flex-col",
              selectedConversationId && "hidden md:flex"
            )}
          >
            {/* Header */}
            <div className="p-4 border-b border-border">
              <h1 className="font-display text-2xl font-bold mb-4">Messages</h1>
              
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Conversations List */}
            <div className="flex-1 overflow-y-auto">
              {filteredConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <MessageCircle className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold mb-2">No messages yet</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {searchQuery
                      ? "No conversations match your search"
                      : "Start a conversation by messaging a seller"}
                  </p>
                  {!searchQuery && (
                    <Button variant="outline" onClick={() => navigate("/collection")}>
                      Browse Vehicles
                    </Button>
                  )}
                </div>
              ) : (
                filteredConversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversationId(conversation.id)}
                    className={cn(
                      "w-full p-4 border-b border-border hover:bg-muted/50 transition-colors text-left",
                      selectedConversationId === conversation.id && "bg-muted"
                    )}
                  >
                    <div className="flex gap-3">
                      {/* Avatar */}
                      <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarImage src={conversation.participantAvatar} />
                        <AvatarFallback>
                          {conversation.participantName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-1">
                          <p className="font-semibold truncate">
                            {conversation.participantName}
                          </p>
                          <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                            {formatTime(conversation.lastMessageTime)}
                          </span>
                        </div>
                        
                        <p className="text-sm text-muted-foreground truncate mb-1">
                          {conversation.listingTitle}
                        </p>
                        
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-muted-foreground truncate flex-1">
                            {conversation.lastMessage}
                          </p>
                          {conversation.unreadCount > 0 && (
                            <Badge className="ml-2 flex-shrink-0">
                              {conversation.unreadCount}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Thread */}
          <div className={cn(
            "flex-1 flex flex-col bg-background",
            !selectedConversationId && "hidden md:flex"
          )}>
            {selectedConversation ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-border bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="md:hidden"
                        onClick={() => setSelectedConversationId(null)}
                      >
                        <ArrowLeft className="h-5 w-5" />
                      </Button>
                      
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.participantAvatar} />
                        <AvatarFallback>
                          {selectedConversation.participantName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <p className="font-semibold">
                          {selectedConversation.participantName}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {selectedConversation.listingTitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          navigate(`/car/${selectedConversation.listingId}`)
                        }
                      >
                        View Listing
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteConversation(selectedConversation.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {/* Listing Card */}
                  <div className="flex justify-center mb-6">
                    <button
                      onClick={() => navigate(`/car/${selectedConversation.listingId}`)}
                      className="max-w-sm w-full bg-card rounded-lg border border-border p-3 hover:border-primary/50 transition-colors"
                    >
                      <div className="flex gap-3">
                        <img
                          src={selectedConversation.listingImage}
                          alt={selectedConversation.listingTitle}
                          className="w-20 h-16 object-cover rounded"
                        />
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-sm mb-1">
                            {selectedConversation.listingTitle}
                          </p>
                          <p className="text-primary font-bold">
                            LKR {(selectedConversation.listingPrice / 1000000).toFixed(1)}M
                          </p>
                        </div>
                      </div>
                    </button>
                  </div>

                  {/* Message Bubbles */}
                  {selectedConversation.messages.map((message) => {
                    const isOwn = message.senderId === user.id;
                    
                    return (
                      <div
                        key={message.id}
                        className={cn(
                          "flex gap-2",
                          isOwn ? "justify-end" : "justify-start"
                        )}
                      >
                        {!isOwn && (
                          <Avatar className="h-8 w-8 flex-shrink-0">
                            <AvatarImage src={message.senderAvatar} />
                            <AvatarFallback>
                              {message.senderName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        
                        <div
                          className={cn(
                            "max-w-[70%] rounded-2xl px-4 py-2",
                            isOwn
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted"
                          )}
                        >
                          <p className="text-sm whitespace-pre-wrap break-words">
                            {message.content}
                          </p>
                          <div
                            className={cn(
                              "flex items-center gap-1 mt-1 text-xs",
                              isOwn
                                ? "text-primary-foreground/70"
                                : "text-muted-foreground"
                            )}
                          >
                            <Clock className="h-3 w-3" />
                            <span>{formatTime(message.timestamp)}</span>
                            {isOwn && message.read && (
                              <CheckCheck className="h-3 w-3 ml-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Replies */}
                <div className="px-4 py-2 border-t border-border bg-muted/30">
                  <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {quickReplies.map((reply, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        onClick={() => setMessageInput(reply)}
                        className="flex-shrink-0"
                      >
                        {reply}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Message Input */}
                <form
                  onSubmit={handleSendMessage}
                  className="p-4 border-t border-border bg-card"
                >
                  <div className="flex gap-2">
                    <Textarea
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      placeholder="Type your message..."
                      className="resize-none min-h-[60px] max-h-[120px]"
                      onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSendMessage(e);
                        }
                      }}
                    />
                    <Button
                      type="submit"
                      variant="gold"
                      size="icon"
                      className="h-[60px] w-[60px] flex-shrink-0"
                      disabled={!messageInput.trim()}
                    >
                      <Send className="h-5 w-5" />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Press Enter to send, Shift+Enter for new line
                  </p>
                </form>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center p-8">
                <div className="text-center max-w-sm">
                  <div className="w-20 h-20 rounded-full bg-muted mx-auto flex items-center justify-center mb-4">
                    <MessageCircle className="h-10 w-10 text-muted-foreground" />
                  </div>
                  <h2 className="font-display text-2xl font-bold mb-2">
                    Select a conversation
                  </h2>
                  <p className="text-muted-foreground">
                    Choose a conversation from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Inbox;

