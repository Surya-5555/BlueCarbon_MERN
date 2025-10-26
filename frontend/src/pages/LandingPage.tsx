import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Lenis from '@studio-freight/lenis';
import { RetroGrid } from '@/components/ui/retro-grid';
import { ZoomParallax } from '@/components/ui/zoom-parallax';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Navbar } from '@/components/Navbar';
import { Icons } from '@/components/ui/icons';
import { ArrowRight, Leaf, Shield, TrendingUp, ShoppingCart } from 'lucide-react';
import { StackedCircularFooter } from '@/components/ui/stacked-circular-footer';
import { Testimonials } from '@/components/ui/testimonials-columns-1';
import { OnboardingChecklist } from '@/components/ui/onboarding-checklist';
import { BorderBeam } from '@/components/ui/border-beam';
import { SupportChat } from '@/components/SupportChat';

const LandingPage = () => {
  useEffect(() => {
    const lenis = new Lenis();
    
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    
    requestAnimationFrame(raf);
    
    return () => {
      lenis.destroy();
    };
  }, []);

  const parallaxImages = [
    {
      src: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Mangrove forest restoration',
    },
    {
      src: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Ocean conservation project',
    },
    {
      src: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Coastal wetland ecosystem',
    },
    {
      src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Coastal biodiversity protection',
    },
    {
      src: 'https://images.unsplash.com/photo-1511884642898-4c92249e20b6?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Seagrass meadow conservation',
    },
    {
      src: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Marine ecosystem restoration',
    },
    {
      src: 'https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=1280&h=720&fit=crop&crop=entropy&auto=format&q=80',
      alt: 'Blue carbon habitat protection',
    },
  ];

  const testimonials = [
    {
      text: "BlueCarbonSIH made trading carbon credits transparent and easy. We've offset more emissions than ever before.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "James Wilson",
      role: "Sustainability Officer",
    },
    {
      text: "The verification process is rigorous and trustworthy. We know our investment is making real impact.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Sarah Johnson",
      role: "CEO, GreenTech",
    },
    {
      text: "As an NGO, this platform gave us the visibility we needed. Our mangrove projects are reaching global investors.",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Michael Chen",
      role: "Conservation Director",
    },
    {
      text: "The dashboard makes managing our carbon portfolio simple. Real-time tracking of our environmental impact.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Emily Rodriguez",
      role: "Environmental Manager",
    },
    {
      text: "BlueCarbonSIH's marketplace connected us with verified coastal restoration projects worldwide.",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "David Park",
      role: "Impact Investor",
    },
    {
      text: "The platform's transparency and verification standards set a new benchmark for carbon credit trading.",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Lisa Anderson",
      role: "Climate Strategist",
    },
    {
      text: "We've streamlined our carbon offset program completely. The ROI on ocean conservation is clear.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Robert Martinez",
      role: "Finance Director",
    },
    {
      text: "BlueCarbonSIH helped us achieve our net-zero goals faster than expected. Highly recommend!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Amanda Taylor",
      role: "CSR Manager",
    },
    {
      text: "The collaborative features make coordination between our team and NGOs seamless.",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=faces&auto=format&q=80",
      name: "Thomas Lee",
      role: "Operations Lead",
    },
  ];

  return (
    <div className="min-h-screen w-full">
      <Navbar />

      {/* Hero Section */}
      <section className="relative flex h-screen items-center justify-center overflow-hidden">
        <RetroGrid className="opacity-60" />
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto animate-fade-in">
          <div className="flex justify-center mb-8">
            <Icons.logo className="w-48 h-48 md:w-64 md:h-64 object-contain" />
          </div>
          <div className="relative inline-block mb-6">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 font-caprasimo text-foreground">
              Trade Blue Carbon Credits
            </h1>
            <p className="text-xl md:text-2xl text-foreground/70 mb-8 max-w-3xl mx-auto font-slabo">
              Join the movement to protect and restore our ocean ecosystems. Buy verified carbon credits
              from coastal conservation projects worldwide.
            </p>
            <BorderBeam size={300} duration={12} delay={5} />
          </div>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/marketplace">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg">
                Explore Projects
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Access Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-6">Quick Access - Test All Roles</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Explore different parts of the platform based on your role
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6 hover:shadow-ocean transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Buyers & Traders</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Purchase credits and manage portfolio
              </p>
              <div className="space-y-2">
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Sign In as User
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground p-2 bg-background rounded">
                  Use any email (e.g., user@test.com)
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-ocean transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">NGOs & Field Users</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Register projects & upload data
              </p>
              <div className="space-y-2">
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Sign In as NGO
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground p-2 bg-background rounded">
                  Use email with "ngo" (e.g., ngo@test.com)
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-ocean transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verifiers</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Review and approve field data
              </p>
              <div className="space-y-2">
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Sign In as Verifier
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground p-2 bg-background rounded">
                  Use email with "verifier" (e.g., verifier@test.com)
                </p>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-ocean transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admins (NCCR)</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Manage platform & approve projects
              </p>
              <div className="space-y-2">
                <Link to="/auth" className="block">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Sign In as Admin
                  </Button>
                </Link>
                <p className="text-xs text-muted-foreground p-2 bg-background rounded">
                  Use email with "admin" (e.g., admin@test.com)
                </p>
              </div>
            </Card>
          </div>
          
          <div className="mt-8 p-6 bg-background rounded-lg border border-border">
            <h4 className="font-semibold mb-2 flex items-center gap-2">
              <span className="text-primary">ℹ️</span> Forms & Dashboard Access
            </h4>
            <ul className="text-sm text-muted-foreground space-y-1 ml-6">
              <li>• <strong>NGO Dashboard:</strong> Access Project Registration and Field Data Collection forms</li>
              <li>• <strong>Verifier Dashboard:</strong> Review and approve submitted field data</li>
              <li>• <strong>Admin Dashboard:</strong> Manage projects, users, and platform settings</li>
              <li>• <strong>User Dashboard:</strong> View purchased credits and retirement certificates</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Onboarding Section */}
      <section className="py-24 px-4 bg-background">
        <OnboardingChecklist
          title="Start Trading Blue Carbon - Quick Setup"
          description="Get your account ready in minutes with these simple requirements"
          items={[
            { id: 1, text: "Valid Email Address" },
            { id: 2, text: "Organization Details (for NGOs)" },
            { id: 3, text: "Payment Method" },
            { id: 4, text: "Project Documentation (for NGOs)", helperText: "Need help with docs?", helperLink: { href: "/docs", text: "View Guidelines" } },
            { id: 5, text: "Bank Account for Payouts (NGOs)" },
          ]}
          videoThumbnailUrl="https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=450&fit=crop"
          videoUrl="https://www.youtube.com/embed/3yBgLxgwS1U?si=_MZFE2nm9fevcj76"
        />
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16">Why Blue Carbon?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-ocean hover:shadow-glow transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <Leaf className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Coastal Protection</h3>
              <p className="text-muted-foreground">
                Support mangroves, seagrass, and salt marshes that protect coastlines and sequester carbon.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-ocean hover:shadow-glow transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <Shield className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Verified Credits</h3>
              <p className="text-muted-foreground">
                All projects undergo rigorous MRV (Monitoring, Reporting & Verification) processes.
              </p>
            </div>
            
            <div className="bg-card p-8 rounded-xl shadow-ocean hover:shadow-glow transition-all duration-300">
              <div className="w-14 h-14 bg-gradient-ocean rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="h-7 w-7 text-primary-foreground" />
              </div>
              <h3 className="text-2xl font-semibold mb-3">Transparent Trading</h3>
              <p className="text-muted-foreground">
                Track your impact with full transparency on credit retirement and project outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Parallax Section */}
      <section className="bg-background">
        <div className="container mx-auto py-16 px-4">
          <h2 className="text-4xl font-bold text-center mb-4">Our Impact</h2>
          <p className="text-center text-muted-foreground mb-12 text-lg max-w-2xl mx-auto">
            Discover projects making real change in coastal ecosystems around the world
          </p>
        </div>
        <ZoomParallax images={parallaxImages} />
      </section>

      {/* Testimonials Section */}
      <Testimonials testimonials={testimonials} />

      {/* CTA Section */}
      <section className="py-24 px-4 bg-gradient-ocean">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-primary-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Start trading verified blue carbon credits today and contribute to ocean conservation.
          </p>
          <Link to="/marketplace">
            <Button size="lg" variant="secondary" className="shadow-glow">
              Browse Marketplace
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <StackedCircularFooter />

      {/* Support Chat */}
      <SupportChat />
    </div>
  );
};

export default LandingPage;
