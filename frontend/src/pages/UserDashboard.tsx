import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Leaf, ShoppingCart, FileText, Award, TrendingUp, DollarSign } from 'lucide-react';
import { LivePriceCard } from '@/components/LivePriceCard';
import { mockUserCredits } from '@/lib/mockData';

const UserDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">My Dashboard</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Leaf className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Credits</p>
                <p className="text-2xl font-bold text-foreground">124</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Retired Credits</p>
                <p className="text-2xl font-bold text-foreground">89</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <ShoppingCart className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold text-foreground">7</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certificates</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Price Card */}
        <div className="mb-6">
          <LivePriceCard />
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">My Credits Portfolio</h2>
            <div className="space-y-4">
              {mockUserCredits.map((purchase) => (
                <div key={purchase.id} className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
                  <div>
                    <p className="font-medium text-foreground">{purchase.projectName}</p>
                    <p className="text-sm text-muted-foreground">
                      {purchase.credits} credits • ${purchase.pricePerCredit}/credit
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Purchased: {new Date(purchase.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-lg font-bold text-primary">${purchase.total}</span>
                    <p className={`text-xs mt-1 px-2 py-1 rounded-full ${
                      purchase.status === 'active' 
                        ? 'bg-success/20 text-success' 
                        : 'bg-muted text-muted-foreground'
                    }`}>
                      {purchase.status}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Portfolio Value</h2>
            <div className="space-y-6">
              <div className="p-4 bg-gradient-ocean rounded-lg text-primary-foreground">
                <p className="text-sm opacity-90">Total Investment</p>
                <p className="text-3xl font-bold">$6,625</p>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Credits</span>
                  <span className="text-xl font-bold text-foreground">150</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Retired Credits</span>
                  <span className="text-xl font-bold text-foreground">75</span>
                </div>
                <div className="flex justify-between items-center pt-3 border-t border-border">
                  <span className="text-muted-foreground">Est. Carbon Offset</span>
                  <span className="text-xl font-bold text-success">225 tCO₂</span>
                </div>
              </div>
              <Button className="w-full bg-gradient-ocean">
                <Award className="mr-2 h-4 w-4" />
                Retire Credits
              </Button>
            </div>
          </Card>
        </div>

        <Card className="p-6 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Retirement Certificates</h2>
            <Button className="bg-gradient-ocean">Download All</Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((cert) => (
              <div key={cert} className="p-4 border border-border rounded-lg hover:shadow-ocean transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-medium text-foreground">Certificate #{cert}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">25 Credits Retired</p>
                <Button variant="outline" size="sm" className="w-full">View Certificate</Button>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default UserDashboard;
