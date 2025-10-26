import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText, TrendingUp, CheckCircle, Clock, Upload, MapPin, BarChart3, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { LivePriceCard } from '@/components/LivePriceCard';

const NGODashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-foreground">Field User Dashboard</h1>
          <Link to="/forms/project-registration">
            <Button className="bg-gradient-ocean">
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </Link>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <FileText className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Projects</p>
                <p className="text-2xl font-bold text-foreground">8</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-foreground">5</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Area Restored</p>
                <p className="text-2xl font-bold text-foreground">1,250 ha</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">BCC Credits</p>
                <p className="text-2xl font-bold text-foreground">3,847</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Price Card */}
        <div className="mb-6">
          <LivePriceCard />
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-6">
          {/* Quick Actions */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Quick Actions</h2>
            <div className="space-y-3">
              <Link to="/forms/field-data-collection" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Field Data
                </Button>
              </Link>
              <Link to="/forms/project-registration" className="block">
                <Button variant="outline" className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Register New Project
                </Button>
              </Link>
              <Button variant="outline" className="w-full justify-start">
                <MapPin className="mr-2 h-4 w-4" />
                View Plot Map
              </Button>
            </div>
          </Card>

          {/* Recent Activity Timeline */}
          <Card className="p-6 lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-success/20 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-success" />
                  </div>
                  <div className="w-px h-full bg-border mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-foreground">Field data verified</p>
                  <p className="text-sm text-muted-foreground">Plot MG-045 approved by verifier</p>
                  <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    <Upload className="h-4 w-4 text-primary" />
                  </div>
                  <div className="w-px h-full bg-border mt-2"></div>
                </div>
                <div className="flex-1 pb-4">
                  <p className="font-medium text-foreground">Data uploaded</p>
                  <p className="text-sm text-muted-foreground">487 saplings recorded in Plot MG-046</p>
                  <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                    <Clock className="h-4 w-4 text-accent-foreground" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground">Verification pending</p>
                  <p className="text-sm text-muted-foreground">Plot SG-123 awaiting review</p>
                  <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">My Projects</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">VM0033</Badge>
                  <Badge className="bg-success/20 text-success">Active</Badge>
                </div>
                <p className="font-medium text-foreground">Mangrove Restoration - Kerala Coast</p>
                <p className="text-sm text-muted-foreground">500 ha • 487 saplings planted</p>
                <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                  <span>Started: Jan 2024</span>
                  <span>Credits earned: 1,250 BCC</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Link to="/forms/field-data-collection">
                  <Button variant="outline" size="sm">
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Data
                  </Button>
                </Link>
                <Button variant="outline" size="sm">Manage</Button>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Seagrass Conservation - Philippines</p>
                <p className="text-sm text-muted-foreground">350 credits available</p>
              </div>
              <span className="text-sm px-3 py-1 bg-success/20 text-success rounded-full mr-4">Approved</span>
              <Button variant="outline">Manage</Button>
            </div>
            
            <div className="flex justify-between items-center p-4 bg-muted/30 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-foreground">Salt Marsh Protection - Indonesia</p>
                <p className="text-sm text-muted-foreground">400 credits requested</p>
              </div>
              <span className="text-sm px-3 py-1 bg-accent/20 text-accent-foreground rounded-full mr-4">Pending</span>
              <Button variant="outline">View</Button>
            </div>
          </div>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Sales Analytics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">This Month</span>
                <span className="text-xl font-bold text-foreground">$12,450</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Last Month</span>
                <span className="text-xl font-bold text-foreground">$10,230</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Revenue</span>
                <span className="text-xl font-bold text-foreground">$42,580</span>
              </div>
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Growth Rate</span>
                  <span className="text-xl font-bold text-success">+21.7%</span>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">MRV Documents</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Verification Report Q1</span>
                <Button variant="outline" size="sm">Upload</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Monitoring Data March</span>
                <Button variant="outline" size="sm">View</Button>
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <span className="text-foreground">Annual Compliance Report</span>
                <Button variant="outline" size="sm">Upload</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default NGODashboard;
