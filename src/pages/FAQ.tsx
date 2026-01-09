import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search, HelpCircle, MessageCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const faqCategories = [
    {
      category: "For Buyers",
      questions: [
        {
          question: "How do I search for vehicles?",
          answer: "Use our advanced search filters on the Collection page to narrow down by make, model, year, price range, and more. You can also save searches to get alerts when new matching vehicles are listed.",
        },
        {
          question: "Are all vehicles verified?",
          answer: "Yes! Every vehicle listed on Exotics.lk goes through our verification process. We verify seller identity, vehicle documentation, and listing accuracy. Look for the 'Verified' badge on listings.",
        },
        {
          question: "How do I contact a seller?",
          answer: "Click on any vehicle listing to view details, then use the 'Contact Seller' button. You can send a message through our platform, call directly, or request a test drive.",
        },
        {
          question: "Can I save my favorite vehicles?",
          answer: "Absolutely! Click the heart icon on any vehicle card to save it to your favorites. Access all your saved vehicles anytime from your profile.",
        },
        {
          question: "Is there a buyer protection policy?",
          answer: "We encourage all transactions to be conducted with proper legal documentation. While we verify listings, we recommend buyers conduct their own inspections and use secure payment methods.",
        },
        {
          question: "How do I schedule a test drive?",
          answer: "On the vehicle details page, click 'Schedule Test Drive' and select your preferred date and time. The seller will confirm availability directly with you.",
        },
      ],
    },
    {
      category: "For Sellers",
      questions: [
        {
          question: "How do I create a listing?",
          answer: "Register as a seller, then go to your Dashboard and click 'Create Listing'. Follow the 5-step wizard to add photos, specifications, features, and pricing. Your listing goes live immediately after submission.",
        },
        {
          question: "Is there a fee to list my vehicle?",
          answer: "Basic listings are free! We offer premium features like homepage placement and featured badges for a small fee. Check our Pricing page for details.",
        },
        {
          question: "How many photos can I upload?",
          answer: "You can upload up to 15 high-quality photos per listing. We recommend including exterior shots from all angles, interior details, and engine bay photos for best results.",
        },
        {
          question: "Can I edit my listing after publishing?",
          answer: "Yes! Go to your Dashboard, find your listing, and click 'Edit'. You can update pricing, photos, description, and any other details anytime.",
        },
        {
          question: "How do buyers contact me?",
          answer: "Buyers can send messages through our platform or call you directly if you've added your phone number. All inquiries appear in your Dashboard inbox.",
        },
        {
          question: "What happens when my vehicle is sold?",
          answer: "Mark your listing as 'Sold' in your Dashboard. This removes it from active search results while keeping your listing history for your records.",
        },
      ],
    },
    {
      category: "Account & Technical",
      questions: [
        {
          question: "How do I reset my password?",
          answer: "Click 'Forgot Password' on the login page, enter your email, and we'll send you a reset link. Follow the instructions in the email to create a new password.",
        },
        {
          question: "Can I change my account type?",
          answer: "Contact our support team to upgrade from Buyer to Seller, or from Seller to Dealer. Account downgrades may require verification.",
        },
        {
          question: "How do I delete my account?",
          answer: "Go to Profile > Settings > Danger Zone. Please note that deleting your account will permanently remove all your data and cannot be undone.",
        },
        {
          question: "Why isn't my listing showing up in search?",
          answer: "New listings typically appear within a few minutes. Ensure you've completed all required fields and uploaded at least one photo. Contact support if the issue persists.",
        },
        {
          question: "How do I report a suspicious listing?",
          answer: "Click the 'Report' button on any listing page. Provide details about your concern and our moderation team will investigate within 24 hours.",
        },
      ],
    },
    {
      category: "Pricing & Payments",
      questions: [
        {
          question: "How much does it cost to use Exotics.lk?",
          answer: "Creating an account and browsing is completely free. Basic listings are free for sellers. We offer optional premium features starting from LKR 5,000.",
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards, bank transfers, and digital wallets for premium features. All vehicle transactions are handled directly between buyer and seller.",
        },
        {
          question: "Do you facilitate vehicle purchases?",
          answer: "We're a listing platform connecting buyers and sellers. All negotiations, payments, and transfers are handled directly between parties. We recommend using secure, documented transactions.",
        },
        {
          question: "Can I get a refund?",
          answer: "Premium listing fees are non-refundable once your listing is published. Contact support within 24 hours for special cases.",
        },
      ],
    },
    {
      category: "Trust & Safety",
      questions: [
        {
          question: "How do I verify a seller's identity?",
          answer: "Look for the 'Verified' badge on seller profiles. Verified sellers have completed our identity verification process. We also display member since date and transaction history.",
        },
        {
          question: "What if I encounter a scam?",
          answer: "Report immediately using the 'Report' button. Never send money before seeing the vehicle in person. Always meet in public places and bring someone with you.",
        },
        {
          question: "Are vehicle histories checked?",
          answer: "We verify documentation, but recommend buyers conduct independent vehicle history checks and inspections before purchase.",
        },
        {
          question: "How do I ensure a safe transaction?",
          answer: "Meet in person at the seller's location, verify all documents, conduct a thorough inspection, use secure payment methods, and ensure proper legal transfer of ownership.",
        },
      ],
    },
  ];

  const filteredFAQs = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      searchQuery === "" ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(cat => cat.questions.length > 0);

  return (
    <div className="min-h-screen">
      <SEO 
        title="FAQ - Frequently Asked Questions"
        description="Find answers to common questions about buying and selling luxury cars on Exotics Lanka."
        keywords="faq, frequently asked questions, help, support"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                Help Center
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Frequently Asked
                <span className="text-gold-gradient block">Questions</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Find answers to common questions about buying and selling on Exotics.lk
              </p>

              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search for answers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {filteredFAQs.length > 0 ? (
              <div className="space-y-12">
                {filteredFAQs.map((category, categoryIndex) => (
                  <div key={categoryIndex}>
                    <div className="flex items-center gap-3 mb-6">
                      <HelpCircle className="h-6 w-6 text-primary" />
                      <h2 className="font-display text-3xl font-bold">
                        {category.category}
                      </h2>
                    </div>

                    <Accordion type="single" collapsible className="space-y-4">
                      {category.questions.map((faq, index) => (
                        <AccordionItem
                          key={index}
                          value={`${categoryIndex}-${index}`}
                          className="bg-card rounded-xl border border-border px-6"
                        >
                          <AccordionTrigger className="text-left hover:text-primary">
                            {faq.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground leading-relaxed">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <HelpCircle className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                <h3 className="font-display text-2xl font-semibold mb-2">
                  No results found
                </h3>
                <p className="text-muted-foreground mb-6">
                  Try adjusting your search query
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchQuery("")}
                >
                  Clear Search
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto bg-card rounded-2xl border border-border p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">
                Still have questions?
              </h2>
              <p className="text-muted-foreground mb-8">
                Can't find the answer you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/contact">
                  <Button variant="gold" size="lg">
                    Contact Support
                  </Button>
                </Link>
                <a href="mailto:support@exotics.lk">
                  <Button variant="outline" size="lg">
                    Email Us
                  </Button>
                </a>
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

export default FAQ;

