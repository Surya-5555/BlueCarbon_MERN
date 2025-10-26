import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, Clock, FileText, MapPin, Image as ImageIcon, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LivePriceCard } from '@/components/LivePriceCard';

const VerifierDashboard = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Verifier Dashboard</h1>
        
        {/* Statistics Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Pending Verification</p>
                <p className="text-2xl font-bold text-foreground">12</p>
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
                <p className="text-2xl font-bold text-foreground">147</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <XCircle className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-foreground">23</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-ocean transition-all duration-300">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-ocean rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Flagged Priority</p>
                <p className="text-2xl font-bold text-foreground">3</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Live Price Card */}
        <div className="mb-6">
          <LivePriceCard />
        </div>

        {/* Verification Queue */}
        <Card className="p-6 mb-6">
          <h2 className="text-2xl font-semibold mb-4 text-foreground">Verification Queue</h2>
          <div className="space-y-4">
            {/* Priority Item */}
            <div className="border-2 border-destructive/50 bg-destructive/5 p-4 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">Priority</Badge>
                    <Badge variant="outline">VM0033</Badge>
                  </div>
                  <h3 className="font-semibold text-lg text-foreground">Mangrove Restoration - Plot MG-045</h3>
                  <p className="text-sm text-muted-foreground">Submitted by Coastal Conservation India</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Kerala, India
                    </span>
                    <span>Area: 12.5 hectares</span>
                    <span>Submitted: 1 day ago</span>
                  </div>
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="p-3 bg-background rounded border">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Field Data Summary
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 487 saplings recorded</li>
                    <li>• Average DBH: 3.2 cm</li>
                    <li>• Survival rate: 92%</li>
                    <li>• SOC: 2.8%</li>
                  </ul>
                </div>
                <div className="p-3 bg-background rounded border">
                  <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" />
                    Documentation
                  </h4>
                  <ul className="text-sm space-y-1 text-muted-foreground">
                    <li>• 24 geo-tagged photos</li>
                    <li>• Satellite imagery (NDVI)</li>
                    <li>• Soil sample data</li>
                    <li>• GPS coordinates verified</li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="bg-gradient-ocean" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>

            {/* Regular Items */}
            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Gold Standard</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">Seagrass Monitoring - Plot SG-123</h3>
                  <p className="text-sm text-muted-foreground">Submitted by Bengal Blue Initiative</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Sundarbans, WB
                    </span>
                    <span>Area: 8.3 hectares</span>
                    <span>Submitted: 3 days ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
                  <XCircle className="mr-2 h-4 w-4" />
                  Reject
                </Button>
                <Button className="bg-gradient-ocean" size="sm">
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Approve
                </Button>
              </div>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">Plan Vivo</Badge>
                  </div>
                  <h3 className="font-semibold text-foreground">Salt Marsh Restoration - Plot SM-089</h3>
                  <p className="text-sm text-muted-foreground">Submitted by Coastal Conservation India</p>
                  <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      Goa, India
                    </span>
                    <span>Area: 15.7 hectares</span>
                    <span>Submitted: 5 days ago</span>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm">
                  View Details
                </Button>
                <Button variant="outline" size="sm" className="text-destructive">
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

        {/* Verification Statistics & Audit Trail */}
        <div className="grid lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Verification Statistics</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Total Verified</span>
                <span className="text-xl font-bold text-foreground">170</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Approval Rate</span>
                <span className="text-xl font-bold text-success">86.5%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Avg. Review Time</span>
                <span className="text-xl font-bold text-foreground">2.3 days</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">This Month</span>
                <span className="text-xl font-bold text-foreground">28 verified</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4 text-foreground">Recent Audit Trail</h2>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Plot MG-044 Approved</p>
                  <p className="text-sm text-muted-foreground">2 hours ago</p>
                </div>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Plot SG-122 Rejected</p>
                  <p className="text-sm text-muted-foreground">5 hours ago</p>
                </div>
                <XCircle className="h-5 w-5 text-destructive" />
              </div>
              <div className="flex justify-between items-center p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="font-medium text-foreground">Plot MG-043 Approved</p>
                  <p className="text-sm text-muted-foreground">1 day ago</p>
                </div>
                <CheckCircle className="h-5 w-5 text-success" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default VerifierDashboard;
