import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, FileText, TrendingUp, CheckCircle, XCircle, AlertCircle, DollarSign, Globe, BarChart3 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LivePriceCard } from '@/components/LivePriceCard';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Admin Dashboard - NCCR</h1>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">1,247</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-foreground">42</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Credits Issued</p>
                <p className="text-2xl font-bold text-foreground">45,892</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Platform Volume</p>
                <p className="text-2xl font-bold text-foreground">$1.2M</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Price Card */}
        <div className="mb-6">
          <LivePriceCard />
        </div>

        <Card className="p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold text-foreground">Project Approval Queue</h2>
            <span className="text-sm text-muted-foreground">8 pending reviews</span>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Coastal Wetland Restoration - Thailand</p>
                <p className="text-sm text-muted-foreground">Submitted by Ocean Conservation Alliance</p>
                <p className="text-xs text-muted-foreground mt-1">600 credits requested • Submitted 2 days ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="bg-gradient-ocean" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Kelp Forest Protection - Australia</p>
                <p className="text-sm text-muted-foreground">Submitted by Marine Life Foundation</p>
                <p className="text-xs text-muted-foreground mt-1">450 credits requested • Submitted 4 days ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="bg-gradient-ocean" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Coral Reef Rehabilitation - Maldives</p>
                <p className="text-sm text-muted-foreground">Submitted by Blue Planet Initiative</p>
                <p className="text-xs text-muted-foreground mt-1">800 credits requested • Submitted 1 week ago</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="bg-gradient-ocean" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6 mb-6">
          {/* Methodology Breakdown */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Methodology Breakdown</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">VM0033</Badge>
                  <span className="text-foreground">Tidal Wetland</span>
                </div>
                <span className="text-xl font-bold text-foreground">18</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Gold Standard</Badge>
                  <span className="text-foreground">Blue Carbon</span>
                </div>
                <span className="text-xl font-bold text-foreground">12</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">Plan Vivo</Badge>
                  <span className="text-foreground">System</span>
                </div>
                <span className="text-xl font-bold text-foreground">8</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">IPCC</Badge>
                  <span className="text-foreground">Wetlands</span>
                </div>
                <span className="text-xl font-bold text-foreground">4</span>
              </div>
            </div>
          </Card>

          {/* Regional Distribution */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <Globe className="h-6 w-6" />
              Regional Distribution
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Kerala</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-gradient-ocean h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-foreground">15</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">West Bengal</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-gradient-ocean h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-foreground">12</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Goa</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-gradient-ocean h-2 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-foreground">8</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Odisha</span>
                <div className="flex items-center gap-2">
                  <div className="w-32 bg-muted rounded-full h-2">
                    <div className="bg-gradient-ocean h-2 rounded-full" style={{ width: '35%' }}></div>
                  </div>
                  <span className="text-sm font-bold text-foreground">7</span>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-foreground">
              <BarChart3 className="h-6 w-6" />
              Carbon Sequestration Analytics
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total CO₂ Offset</span>
                <span className="text-xl font-bold text-foreground">125,847 tCO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">This Quarter</span>
                <span className="text-xl font-bold text-success">+8,234 tCO₂</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg per Project</span>
                <span className="text-xl font-bold text-foreground">2,996 tCO₂</span>
              </div>
              <div className="pt-4 border-t border-border">
                <Button className="w-full bg-gradient-ocean">
                  <BarChart3 className="mr-2 h-4 w-4" />
                  View Detailed Analytics
                </Button>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Platform Analytics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Credits Traded (Total)</span>
                <span className="text-xl font-bold text-foreground">45,892</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Credits Traded (This Month)</span>
                <span className="text-xl font-bold text-foreground">3,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Active Projects</span>
                <span className="text-xl font-bold text-foreground">34</span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Platform Growth</span>
                  <span className="text-xl font-bold text-success">+18.5%</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
