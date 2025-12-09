import { MessageSquare, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockMessages = [
  {
    id: 1,
    sender: "Kamal Perera",
    subject: "Interested in Mercedes S-Class",
    preview: "Hi, I saw your listing for the 2023 Mercedes-Benz S-Class...",
    time: "2 hours ago",
    unread: true,
    car: "Mercedes-Benz S-Class S500",
  },
  {
    id: 2,
    sender: "Nuwan Silva",
    subject: "Price negotiation for BMW",
    preview: "Would you consider LKR 68M for the BMW 7 Series?",
    time: "4 hours ago",
    unread: true,
    car: "BMW 7 Series 740i",
  },
  {
    id: 3,
    sender: "Dilshan Fernando",
    subject: "Test drive request",
    preview: "I'd like to schedule a test drive for the Porsche...",
    time: "1 day ago",
    unread: false,
    car: "Porsche 911 Carrera S",
  },
];

const Inbox = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="font-display text-2xl font-bold">Inbox</h2>
          <p className="text-sm text-muted-foreground">Manage your leads and messages</p>
        </div>
        <Badge variant="warning" className="text-sm">
          2 unread
        </Badge>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {mockMessages.map((message) => (
          <div
            key={message.id}
            className={`glass-dark rounded-2xl p-4 md:p-6 cursor-pointer transition-all hover:bg-muted/20 ${
              message.unread ? "border-l-4 border-l-primary" : ""
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <User className="h-6 w-6 text-muted-foreground" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                  <h3 className="font-semibold">{message.sender}</h3>
                  <Badge variant="secondary" className="text-xs w-fit">
                    {message.car}
                  </Badge>
                </div>
                <p className="font-medium text-sm mb-1">{message.subject}</p>
                <p className="text-sm text-muted-foreground truncate">{message.preview}</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{message.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State Hint */}
      <div className="glass-dark rounded-2xl p-8 text-center">
        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">
          All caught up! Keep your response time under 30 minutes for best results.
        </p>
      </div>
    </div>
  );
};

export default Inbox;
