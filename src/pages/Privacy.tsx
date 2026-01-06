import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

const Privacy = () => {
  const lastUpdated = "January 1, 2024";

  const sections = [
    {
      title: "1. Information We Collect",
      content: `We collect several types of information for various purposes to provide and improve our service to you.

**Personal Data**
While using our Platform, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you, including but not limited to:
• Email address
• First name and last name
• Phone number
• Address, State, Province, ZIP/Postal code, City
• Profile picture
• Vehicle listings information

**Usage Data**
We may also collect information about how the Platform is accessed and used. This Usage Data may include:
• Your computer's Internet Protocol address (IP address)
• Browser type and version
• The pages of our Platform that you visit
• The time and date of your visit
• The time spent on those pages
• Unique device identifiers and other diagnostic data

**Tracking & Cookies Data**
We use cookies and similar tracking technologies to track activity on our Platform and hold certain information.`,
    },
    {
      title: "2. How We Use Your Information",
      content: `Exotics.lk uses the collected data for various purposes:

• To provide and maintain our Platform
• To notify you about changes to our Platform
• To allow you to participate in interactive features when you choose to do so
• To provide customer support
• To gather analysis or valuable information so that we can improve our Platform
• To monitor the usage of our Platform
• To detect, prevent and address technical issues
• To provide you with news, special offers and general information about other goods, services and events which we offer (unless you have opted not to receive such information)
• To facilitate transactions between buyers and sellers
• To verify listings and user accounts`,
    },
    {
      title: "3. Data Storage and Security",
      content: `The security of your data is important to us. We strive to use commercially acceptable means to protect your Personal Data, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure.

Your information is stored on secure servers and is protected by:
• Industry-standard encryption protocols
• Regular security audits
• Access controls and authentication measures
• Secure data backup procedures

While we strive to protect your personal information, we cannot guarantee its absolute security.`,
    },
    {
      title: "4. Data Sharing and Disclosure",
      content: `**With Other Users**
When you create a listing, certain information (such as your name, contact information, and listing details) will be visible to other users of the Platform.

**With Service Providers**
We may employ third-party companies and individuals to facilitate our Platform ("Service Providers"), provide the Platform on our behalf, perform Platform-related services, or assist us in analyzing how our Platform is used.

These third parties have access to your Personal Data only to perform these tasks on our behalf and are obligated not to disclose or use it for any other purpose.

**For Legal Requirements**
We may disclose your Personal Data in the good faith belief that such action is necessary to:
• Comply with a legal obligation
• Protect and defend the rights or property of Exotics.lk
• Prevent or investigate possible wrongdoing in connection with the Platform
• Protect the personal safety of users of the Platform or the public
• Protect against legal liability`,
    },
    {
      title: "5. Your Data Protection Rights",
      content: `Under data protection law, you have rights including:

**Right to Access** - You have the right to request copies of your personal data.

**Right to Rectification** - You have the right to request that we correct any information you believe is inaccurate or complete information you believe is incomplete.

**Right to Erasure** - You have the right to request that we erase your personal data, under certain conditions.

**Right to Restrict Processing** - You have the right to request that we restrict the processing of your personal data, under certain conditions.

**Right to Object to Processing** - You have the right to object to our processing of your personal data, under certain conditions.

**Right to Data Portability** - You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.

To exercise any of these rights, please contact us at privacy@exotics.lk.`,
    },
    {
      title: "6. Children's Privacy",
      content: `Our Platform does not address anyone under the age of 18 ("Children").

We do not knowingly collect personally identifiable information from anyone under the age of 18. If you are a parent or guardian and you are aware that your Child has provided us with Personal Data, please contact us. If we become aware that we have collected Personal Data from children without verification of parental consent, we take steps to remove that information from our servers.`,
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track the activity on our Platform and hold certain information.

**What are cookies?**
Cookies are files with a small amount of data which may include an anonymous unique identifier. Cookies are sent to your browser from a website and stored on your device.

**How we use cookies:**
• Essential cookies: Required for the Platform to function properly
• Analytical cookies: Help us understand how you use our Platform
• Functional cookies: Remember your preferences and settings
• Marketing cookies: Track your online activity to help advertisers deliver more relevant advertising

You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. However, if you do not accept cookies, you may not be able to use some portions of our Platform.`,
    },
    {
      title: "8. Third-Party Services",
      content: `Our Platform may contain links to third-party websites or services that are not owned or controlled by Exotics.lk.

Exotics.lk has no control over, and assumes no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You further acknowledge and agree that Exotics.lk shall not be responsible or liable, directly or indirectly, for any damage or loss caused or alleged to be caused by or in connection with the use of or reliance on any such content, goods or services available on or through any such websites or services.

We strongly advise you to read the terms and conditions and privacy policies of any third-party websites or services that you visit.`,
    },
    {
      title: "9. Data Retention",
      content: `We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.

We will also retain Usage Data for internal analysis purposes. Usage Data is generally retained for a shorter period of time, except when this data is used to strengthen the security or to improve the functionality of our Platform, or we are legally obligated to retain this data for longer time periods.`,
    },
    {
      title: "10. International Data Transfers",
      content: `Your information, including Personal Data, may be transferred to — and maintained on — computers located outside of your state, province, country or other governmental jurisdiction where the data protection laws may differ from those of your jurisdiction.

If you are located outside Sri Lanka and choose to provide information to us, please note that we transfer the data, including Personal Data, to Sri Lanka and process it there.

Your consent to this Privacy Policy followed by your submission of such information represents your agreement to that transfer.`,
    },
    {
      title: "11. Changes to This Privacy Policy",
      content: `We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date at the top of this Privacy Policy.

You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are effective when they are posted on this page.

We will let you know via email and/or a prominent notice on our Platform, prior to the change becoming effective and update the "Last updated" date at the top of this Privacy Policy.`,
    },
    {
      title: "12. Contact Us",
      content: `If you have any questions about this Privacy Policy, please contact us:

**By email:** privacy@exotics.lk
**By phone:** +94 77 123 4567
**By mail:** 123 Galle Road, Colombo 03, Sri Lanka

Our Data Protection Officer can be reached at: dpo@exotics.lk`,
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero */}
        <section className="py-16 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4 text-center">
            <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
              Legal
            </Badge>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
              Privacy Policy
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
            <div className="mb-12 p-6 rounded-xl bg-emerald-500/5 border border-emerald-500/20">
              <div className="flex items-start gap-4">
                <Shield className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
                <div>
                  <h2 className="font-display text-xl font-semibold mb-2">
                    Your Privacy Matters
                  </h2>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    At Exotics.lk, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Platform.
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

            {/* Consent */}
            <div className="mt-12 p-6 rounded-xl bg-muted/30 border border-border">
              <h3 className="font-display text-xl font-semibold mb-3">
                Your Consent
              </h3>
              <p className="text-sm text-muted-foreground">
                By using our Platform, you consent to our Privacy Policy and agree to its terms. If you do not agree to this policy, please do not use our Platform.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;

