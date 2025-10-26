import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MapPin, Upload, Calendar, Leaf } from 'lucide-react';
import { toast } from 'sonner';

const ProjectRegistrationForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    organizationName: '',
    organizationContact: '',
    latitude: '',
    longitude: '',
    ecosystemType: '',
    methodology: '',
    areaHectares: '',
    startDate: '',
    endDate: '',
    projectGoals: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Project registration submitted successfully!');
    console.log('Form submitted:', formData);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Project Registration</h1>
          <p className="text-muted-foreground">Submit your blue carbon project for approval</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
              <Leaf className="h-6 w-6" />
              Project Details
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="projectName">Project Name *</Label>
                  <Input
                    id="projectName"
                    value={formData.projectName}
                    onChange={(e) => handleChange('projectName', e.target.value)}
                    placeholder="e.g., Mangrove Restoration Kerala"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="organizationName">Organization Name *</Label>
                  <Input
                    id="organizationName"
                    value={formData.organizationName}
                    onChange={(e) => handleChange('organizationName', e.target.value)}
                    placeholder="Your organization name"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="organizationContact">Organization Contact Email *</Label>
                <Input
                  id="organizationContact"
                  type="email"
                  value={formData.organizationContact}
                  onChange={(e) => handleChange('organizationContact', e.target.value)}
                  placeholder="contact@organization.org"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Ecosystem Type *</Label>
                <Select value={formData.ecosystemType} onValueChange={(value) => handleChange('ecosystemType', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select ecosystem type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mangrove">Mangrove Forest</SelectItem>
                    <SelectItem value="seagrass">Seagrass Meadow</SelectItem>
                    <SelectItem value="saltmarsh">Salt Marsh</SelectItem>
                    <SelectItem value="tidal">Tidal Wetland</SelectItem>
                    <SelectItem value="kelp">Kelp Forest</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Methodology *</Label>
                <Select value={formData.methodology} onValueChange={(value) => handleChange('methodology', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select carbon methodology" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="VM0033">VM0033 - Tidal Wetland and Seagrass Restoration</SelectItem>
                    <SelectItem value="VM0007">VM0007 - REDD+ Methodology Framework</SelectItem>
                    <SelectItem value="gold-standard">Gold Standard for Blue Carbon</SelectItem>
                    <SelectItem value="plan-vivo">Plan Vivo System</SelectItem>
                    <SelectItem value="ipcc">IPCC Wetlands Supplement</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
              <MapPin className="h-6 w-6" />
              Location Information
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="latitude">Latitude (GPS) *</Label>
                  <Input
                    id="latitude"
                    type="number"
                    step="0.000001"
                    value={formData.latitude}
                    onChange={(e) => handleChange('latitude', e.target.value)}
                    placeholder="e.g., 12.9716"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="longitude">Longitude (GPS) *</Label>
                  <Input
                    id="longitude"
                    type="number"
                    step="0.000001"
                    value={formData.longitude}
                    onChange={(e) => handleChange('longitude', e.target.value)}
                    placeholder="e.g., 77.5946"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="areaHectares">Project Area (hectares) *</Label>
                <Input
                  id="areaHectares"
                  type="number"
                  step="0.01"
                  value={formData.areaHectares}
                  onChange={(e) => handleChange('areaHectares', e.target.value)}
                  placeholder="e.g., 150.5"
                  required
                />
              </div>

              <div className="p-4 bg-muted/30 rounded-lg">
                <p className="text-sm text-muted-foreground mb-2">Interactive Map (Coming Soon)</p>
                <div className="w-full h-48 bg-muted rounded flex items-center justify-center">
                  <MapPin className="h-12 w-12 text-muted-foreground" />
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
              <Calendar className="h-6 w-6" />
              Project Timeline
            </h2>
            
            <div className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="startDate">Start Date *</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => handleChange('startDate', e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="endDate">Expected End Date *</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => handleChange('endDate', e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="projectGoals">Project Goals & Description *</Label>
                <Textarea
                  id="projectGoals"
                  value={formData.projectGoals}
                  onChange={(e) => handleChange('projectGoals', e.target.value)}
                  placeholder="Describe your project goals, expected outcomes, and community involvement..."
                  rows={6}
                  required
                />
              </div>
            </div>
          </Card>

          <Card className="p-6 mb-6">
            <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
              <Upload className="h-6 w-6" />
              Baseline Documentation
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="baselineData">Baseline Data File (PDF, Excel, CSV) *</Label>
                <Input
                  id="baselineData"
                  type="file"
                  accept=".pdf,.xlsx,.xls,.csv"
                  required
                />
                <p className="text-xs text-muted-foreground">
                  Upload baseline ecological data including species counts, soil samples, etc.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="sitePhotos">Site Photographs</Label>
                <Input
                  id="sitePhotos"
                  type="file"
                  accept="image/*"
                  multiple
                />
                <p className="text-xs text-muted-foreground">
                  Upload current site photos (supports multiple files)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="additionalDocs">Additional Documents</Label>
                <Input
                  id="additionalDocs"
                  type="file"
                  accept=".pdf,.doc,.docx"
                  multiple
                />
                <p className="text-xs text-muted-foreground">
                  Any additional permits, approvals, or supporting documents
                </p>
              </div>
            </div>
          </Card>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Save as Draft
            </Button>
            <Button type="submit" className="bg-gradient-ocean">
              Submit for Approval
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectRegistrationForm;
