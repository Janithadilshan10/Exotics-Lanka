import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import { ButtonLoading } from "@/components/ui/loading";
import { successConfetti } from "@/lib/confetti";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare } from "lucide-react";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Save to localStorage (mock)
    const inquiries = JSON.parse(localStorage.getItem("contactInquiries") || "[]");
    inquiries.push({
      ...formData,
      id: Date.now(),
      createdAt: new Date().toISOString(),
      status: "pending",
    });
    localStorage.setItem("contactInquiries", JSON.stringify(inquiries));

    toast.success("Message sent! We'll get back to you within 24 hours.");
    setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "support@exotics.lk",
      link: "mailto:support@exotics.lk",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+94 77 123 4567",
      link: "tel:+94771234567",
    },
    {
      icon: MapPin,
      label: "Address",
      value: "123 Galle Road, Colombo 03, Sri Lanka",
      link: "https://maps.google.com",
    },
    {
      icon: Clock,
      label: "Business Hours",
      value: "Mon-Sat: 9AM - 6PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Contact Us - Get In Touch"
        description="Have questions? Contact Exotics Lanka. We're here to help with your luxury car buying or selling needs."
        keywords="contact us, customer support, get in touch, help"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Get In Touch
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Contact Us
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Have questions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
        </section>

        {/* Contact Form & Info */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-3 gap-12">
              {/* Contact Info */}
              <div className="lg:col-span-1 space-y-8">
                <div>
                  <h2 className="font-display text-3xl font-bold mb-6">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    Fill up the form and our team will get back to you within 24 hours.
                  </p>
                </div>

                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {info.label}
                        </p>
                        {info.link ? (
                          <a
                            href={info.link}
                            className="font-medium hover:text-primary transition-colors"
                            target={info.link.startsWith("http") ? "_blank" : undefined}
                            rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                          >
                            {info.value}
                          </a>
                        ) : (
                          <p className="font-medium">{info.value}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Social Links */}
                <div className="pt-8 border-t border-border">
                  <p className="text-sm text-muted-foreground mb-4">Follow Us</p>
                  <div className="flex gap-3">
                    {["Facebook", "Instagram", "Twitter", "LinkedIn"].map((social) => (
                      <a
                        key={social}
                        href="#"
                        className="w-10 h-10 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                        title={social}
                      >
                        <span className="text-xs font-bold">
                          {social.charAt(0)}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-card rounded-2xl border border-border p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <MessageSquare className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-display text-2xl font-semibold">
                        Send us a message
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        We'll respond within 24 hours
                      </p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          placeholder="John Doe"
                          required
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Phone */}
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData({ ...formData, phone: e.target.value })
                          }
                          placeholder="+94 77 123 4567"
                        />
                      </div>

                      {/* Subject */}
                      <div className="space-y-2">
                        <Label htmlFor="subject">Subject *</Label>
                        <Select
                          value={formData.subject}
                          onValueChange={(value) =>
                            setFormData({ ...formData, subject: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="support">Technical Support</SelectItem>
                            <SelectItem value="listing">Listing Question</SelectItem>
                            <SelectItem value="account">Account Issue</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        required
                      />
                      <p className="text-xs text-muted-foreground">
                        {formData.message.length} / 1000 characters
                      </p>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      variant="gold"
                      size="lg"
                      className="w-full gap-2"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold mb-4">
                Visit Our Showroom
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Come see our collection in person. By appointment only.
              </p>
            </div>

            {/* Mock Map */}
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video rounded-2xl overflow-hidden border border-border bg-muted flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">
                    Map integration coming soon
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    123 Galle Road, Colombo 03, Sri Lanka
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Contact;

