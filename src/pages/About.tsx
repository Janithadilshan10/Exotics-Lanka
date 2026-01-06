import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, TrendingUp, Heart, Sparkles } from "lucide-react";

const About = () => {
  const stats = [
    { label: "Luxury Vehicles", value: "500+", icon: TrendingUp },
    { label: "Verified Dealers", value: "50+", icon: Shield },
    { label: "Happy Buyers", value: "10K+", icon: Heart },
    { label: "Years Experience", value: "5+", icon: Award },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Every vehicle is verified and every dealer is vetted. We believe in complete transparency in pricing and vehicle history.",
    },
    {
      icon: Award,
      title: "Quality First",
      description: "We curate only the finest luxury and exotic vehicles, ensuring exceptional quality standards for every listing.",
    },
    {
      icon: Users,
      title: "Customer Centric",
      description: "Your satisfaction drives us. From browsing to purchase, we're committed to providing an exceptional experience.",
    },
    {
      icon: Sparkles,
      title: "Innovation",
      description: "Leveraging cutting-edge technology to make buying and selling luxury vehicles seamless and secure.",
    },
  ];

  const team = [
    {
      name: "Rajesh Kumar",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    },
    {
      name: "Shalini Fernando",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    },
    {
      name: "Arjun Perera",
      role: "Lead Developer",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    },
    {
      name: "Maya Silva",
      role: "Customer Success",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="pt-20">
        {/* Hero Section */}
        <section className="relative py-24 bg-gradient-to-br from-background via-muted/30 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-6 bg-primary/10 text-primary border-primary/20">
                About Exotics.lk
              </Badge>
              <h1 className="font-display text-5xl md:text-6xl font-bold mb-6">
                Where Elegance Meets
                <span className="text-gold-gradient block">Automotive Excellence</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Sri Lanka's most trusted marketplace for luxury and exotic vehicles. We connect discerning buyers with verified sellers, making premium automotive dreams a reality.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 border-y border-border">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                  <p className="font-display text-4xl font-bold text-gold-gradient mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="font-display text-4xl font-bold mb-6">
                  Our Story
                </h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Founded in 2019, Exotics.lk was born from a simple observation: buying and selling luxury vehicles in Sri Lanka deserved a platform as exceptional as the cars themselves.
                  </p>
                  <p>
                    What started as a passion project by automotive enthusiasts has grown into the island's premier luxury vehicle marketplace, trusted by thousands of buyers and sellers.
                  </p>
                  <p>
                    Today, we're proud to offer a curated selection of over 500 premium vehicles, from classic Mercedes-Benz sedans to exotic Lamborghinis, all verified by our expert team.
                  </p>
                  <p>
                    Our mission remains unchanged: to provide a trustworthy, transparent, and exceptional platform for the luxury automotive community in Sri Lanka.
                  </p>
                </div>
              </div>
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=2070&auto=format&fit=crop"
                  alt="Luxury Cars"
                  className="rounded-2xl shadow-2xl"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-lg">
                  <p className="font-display text-3xl font-bold">2019</p>
                  <p className="text-sm">Since</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold mb-4">
                Our Values
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl font-bold mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                The passionate people behind Exotics.lk
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center group">
                  <div className="relative mb-4 overflow-hidden rounded-2xl">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-1">
                    {member.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-primary/10 via-transparent to-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-4xl font-bold mb-4">
              Join Our Community
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're buying your dream car or selling your prized vehicle, we're here to help every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/collection">
                <button className="px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:opacity-90 transition-opacity">
                  Browse Collection
                </button>
              </a>
              <a href="/contact">
                <button className="px-8 py-4 border-2 border-border font-semibold rounded-xl hover:border-primary transition-colors">
                  Contact Us
                </button>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;


