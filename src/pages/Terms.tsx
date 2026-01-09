import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { FileText } from "lucide-react";
import { PageTransition } from "@/components/PageTransition";
import { SEO } from "@/components/SEO";

const Terms = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      title: "1. Acceptance of Terms",
      content: `By accessing and using Exotics.lk ("the Platform"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.`,
    },
    {
      title: "2. Use License",
      content: `Permission is granted to temporarily access the materials (information or software) on Exotics.lk for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to decompile or reverse engineer any software contained on Exotics.lk
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or "mirror" the materials on any other server

This license shall automatically terminate if you violate any of these restrictions and may be terminated by Exotics.lk at any time.`,
    },
    {
      title: "3. User Accounts",
      content: `When you create an account with us, you must provide accurate, complete, and current information at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account.

You are responsible for safeguarding the password that you use to access the Platform and for any activities or actions under your password. You agree not to disclose your password to any third party. You must notify us immediately upon becoming aware of any breach of security or unauthorized use of your account.`,
    },
    {
      title: "4. Listing Requirements",
      content: `Sellers must provide accurate and truthful information about their vehicles. All listings must include:

• Accurate vehicle specifications
• Current and honest pricing
• Clear, recent photographs
• Truthful condition descriptions
• Valid contact information

Exotics.lk reserves the right to remove any listing that violates these requirements or is deemed inappropriate, misleading, or fraudulent.`,
    },
    {
      title: "5. Transactions",
      content: `Exotics.lk is a marketplace platform that connects buyers and sellers. We are not a party to any transaction between users. All negotiations, agreements, and transactions are solely between the buyer and seller.

Users are responsible for:
• Conducting their own due diligence
• Verifying vehicle condition and documentation
• Arranging payment and transfer of ownership
• Complying with all applicable laws and regulations

Exotics.lk does not guarantee the accuracy of listings, the quality of vehicles, or the conduct of users.`,
    },
    {
      title: "6. Fees and Payment",
      content: `Basic account registration and browsing are free. Premium features and services may require payment. All fees are clearly displayed before purchase and are non-refundable unless otherwise stated.

Exotics.lk reserves the right to modify pricing at any time. Changes will not affect services already purchased.`,
    },
    {
      title: "7. Prohibited Activities",
      content: `You may not use the Platform to:

• Post false, inaccurate, misleading, or defamatory content
• Impersonate any person or entity
• Violate any applicable laws or regulations
• Transmit any harmful code, viruses, or malware
• Harass, abuse, or harm another person
• Collect or store personal data about other users
• Interfere with the proper functioning of the Platform
• Attempt to gain unauthorized access to any portion of the Platform`,
    },
    {
      title: "8. Intellectual Property",
      content: `The Platform and its original content, features, and functionality are owned by Exotics.lk and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.

Users retain ownership of content they upload but grant Exotics.lk a worldwide, non-exclusive, royalty-free license to use, reproduce, and display such content for the purpose of operating and promoting the Platform.`,
    },
    {
      title: "9. Disclaimer",
      content: `The materials on Exotics.lk are provided on an 'as is' basis. Exotics.lk makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.

Exotics.lk does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.`,
    },
    {
      title: "10. Limitations of Liability",
      content: `In no event shall Exotics.lk or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Exotics.lk, even if Exotics.lk or an authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      title: "11. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless Exotics.lk, its officers, directors, employees, agents, and third parties, for any losses, costs, liabilities and expenses (including reasonable attorney's fees) relating to or arising out of your use of or inability to use the Platform, any user postings made by you, your violation of any terms of this Agreement or your violation of any rights of a third party.`,
    },
    {
      title: "12. Termination",
      content: `We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.

Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the Platform or contact us to request account deletion.`,
    },
    {
      title: "13. Governing Law",
      content: `These Terms shall be governed and construed in accordance with the laws of Sri Lanka, without regard to its conflict of law provisions.

Any disputes arising from these Terms or your use of the Platform shall be subject to the exclusive jurisdiction of the courts of Colombo, Sri Lanka.`,
    },
    {
      title: "14. Changes to Terms",
      content: `We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days' notice prior to any new terms taking effect.

By continuing to access or use our Platform after those revisions become effective, you agree to be bound by the revised terms.`,
    },
    {
      title: "15. Contact Information",
      content: `If you have any questions about these Terms, please contact us at:

Email: legal@exotics.lk
Phone: +94 77 123 4567
Address: 123 Galle Road, Colombo 03, Sri Lanka`,
    },
  ];

  return (
    <div className="min-h-screen">
      <SEO 
        title="Terms of Service - User Agreement"
        description="Read the terms of service for using Exotics Lanka's luxury car marketplace platform."
        keywords="terms of service, user agreement, legal terms"
      />
      <Navbar />
      <PageTransition>
        <main id="main-content" className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Legal
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground">
              Last updated: {lastUpdated}
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            {/* Introduction */}
            <div className="mb-12 p-6 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex items-start gap-4">
                <FileText className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-semibold mb-2">
                    Important Notice
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Please read these Terms of Service carefully before using Exotics.lk. These terms contain important information about your legal rights, remedies, and obligations.
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div className="prose prose-slate dark:prose-invert max-w-none">
              {sections.map((section, index) => (
                <div key={index} className="mb-8">
                  <h2 className="font-display text-2xl font-bold mb-4 text-foreground">
                    {section.title}
                  </h2>
                  <div className="text-muted-foreground leading-relaxed whitespace-pre-line">
                    {section.content}
                  </div>
                </div>
              ))}
            </div>

            {/* Acknowledgment */}
            <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-display text-xl font-semibold mb-3">
                Acknowledgment
              </h3>
              <p className="text-sm text-muted-foreground">
                By using Exotics.lk, you acknowledge that you have read these Terms of Service and agree to be bound by them. If you do not agree with any part of these terms, you must not use our Platform.
              </p>
            </div>
          </div>
        </section>
      </main>
      </PageTransition>
      <Footer />
    </div>
  );
};

export default Terms;

