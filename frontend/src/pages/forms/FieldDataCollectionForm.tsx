import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, MapPin, Droplet, Leaf, FileText } from 'lucide-react';
import { apiClient } from '@/lib/api';
import { toast } from 'sonner';

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-foreground">Blue Carbon Field Data</h1>
      </div>
    </div>
  );
};

const FieldDataCollectionForm = () => {
  const [currentTab, setCurrentTab] = useState('basic');
  const [showToast, setShowToast] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Store form data in state to persist across tab switches
  const [formData, setFormData] = useState<any>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.plotId || !formData.collectionDate || !formData.gpsLat || !formData.gpsLong) {
      toast.error('Please fill in all required fields in Basic Info section');
      setCurrentTab('basic');
      return;
    }

    setLoading(true);
    
    try {
      // Extract form data
      const fieldData: any = {
        // Basic Info
        plotId: formData.plotId,
        collectionDate: formData.collectionDate,
        gpsLatitude: formData.gpsLat ? parseFloat(formData.gpsLat) : undefined,
        gpsLongitude: formData.gpsLong ? parseFloat(formData.gpsLong) : undefined,
        plotNotes: formData.plotNotes,
        
        // Vegetation
        species: formData.species,
        dbh: formData.dbh ? parseFloat(formData.dbh) : undefined,
        treeHeight: formData.treeHeight ? parseFloat(formData.treeHeight) : undefined,
        plotDensity: formData.plotDensity ? parseFloat(formData.plotDensity) : undefined,
        canopyCover: formData.canopyCover ? parseFloat(formData.canopyCover) : undefined,
        survivalRate: formData.survivalRate ? parseFloat(formData.survivalRate) : undefined,
        
        // Soil Data
        sampleDepth: formData.sampleDepth ? parseFloat(formData.sampleDepth) : undefined,
        bulkDensity: formData.bulkDensity ? parseFloat(formData.bulkDensity) : undefined,
        organicMatter: formData.organicMatter ? parseFloat(formData.organicMatter) : undefined,
        soilOrganicCarbon: formData.soc ? parseFloat(formData.soc) : undefined,
        soilPh: formData.soilPh ? parseFloat(formData.soilPh) : undefined,
        soilTexture: formData.soilTexture,
        soilMoisture: formData.soilMoisture ? parseFloat(formData.soilMoisture) : undefined,
        
        // Hydrology
        waterTableDepth: formData.waterTableDepth ? parseFloat(formData.waterTableDepth) : undefined,
        salinity: formData.salinity ? parseFloat(formData.salinity) : undefined,
        waterPh: formData.waterPh ? parseFloat(formData.waterPh) : undefined,
        waterTemperature: formData.waterTemp ? parseFloat(formData.waterTemp) : undefined,
        dissolvedOxygen: formData.dissolvedOxygen ? parseFloat(formData.dissolvedOxygen) : undefined,
        tidalRange: formData.tidalRange ? parseFloat(formData.tidalRange) : undefined,
        managementEvent: formData.managementEvent,
      };

      await apiClient.createFieldData(fieldData);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
      toast.success('Field data saved successfully!');
      
      // Clear form after successful submission
      setFormData({});
    } catch (error) {
      console.error('Failed to submit field data:', error);
      toast.error('Failed to save field data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    
    try {
      const fieldData: any = {
        plotId: formData.plotId || 'Draft',
        plotNotes: formData.plotNotes,
        collectionDate: formData.collectionDate || new Date().toISOString().split('T')[0],
      };

      await apiClient.saveFieldDataDraft(fieldData);
      toast.success('Draft saved successfully!');
    } catch (error) {
      console.error('Failed to save draft:', error);
      toast.error('Failed to save draft');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Field Data Collection</h1>
          <p className="text-muted-foreground">Record measurements and observations from the field</p>
        </div>

        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 h-auto gap-1 p-1">
            <TabsTrigger value="basic" className="px-2 py-2">Basic Info</TabsTrigger>
            <TabsTrigger value="vegetation" className="px-2 py-2">Vegetation</TabsTrigger>
            <TabsTrigger value="soil" className="px-2 py-2">Soil Data</TabsTrigger>
            <TabsTrigger value="hydrology" className="px-2 py-2">Hydrology</TabsTrigger>
            <TabsTrigger value="photos" className="px-2 py-2">Photos</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <MapPin className="h-6 w-6" />
                Plot Information
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="plotId">Plot ID *</Label>
                    <Input id="plotId" name="plotId" value={formData.plotId || ''} onChange={handleInputChange} placeholder="e.g., MG-045-A" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="collectionDate">Collection Date *</Label>
                    <Input id="collectionDate" name="collectionDate" type="date" value={formData.collectionDate || ''} onChange={handleInputChange} required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="gpsLat">GPS Latitude *</Label>
                    <Input id="gpsLat" name="gpsLat" type="number" step="0.000001" value={formData.gpsLat || ''} onChange={handleInputChange} placeholder="Auto-captured" required />
                    <Button type="button" variant="outline" size="sm" className="mt-2">
                      <MapPin className="mr-2 h-4 w-4" />
                      Capture GPS
                    </Button>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="gpsLong">GPS Longitude *</Label>
                    <Input id="gpsLong" name="gpsLong" type="number" step="0.000001" value={formData.gpsLong || ''} onChange={handleInputChange} placeholder="Auto-captured" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="plotNotes">Plot Notes</Label>
                  <Textarea id="plotNotes" name="plotNotes" value={formData.plotNotes || ''} onChange={handleInputChange} placeholder="Any observations about the plot conditions..." rows={4} />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="vegetation" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <Leaf className="h-6 w-6" />
                Vegetation Measurements
              </h2>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="species">Species *</Label>
                  <Select name="species" value={formData.species || ''} onValueChange={(value) => handleSelectChange('species', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select or search species" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="avicennia-marina">Avicennia marina (Grey Mangrove)</SelectItem>
                      <SelectItem value="rhizophora-mucronata">Rhizophora mucronata (Red Mangrove)</SelectItem>
                      <SelectItem value="bruguiera-gymnorrhiza">Bruguiera gymnorrhiza (Black Mangrove)</SelectItem>
                      <SelectItem value="zostera-marina">Zostera marina (Eelgrass)</SelectItem>
                      <SelectItem value="other">Other (specify in notes)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="dbh">DBH - Diameter at Breast Height (cm) *</Label>
                    <Input id="dbh" name="dbh" type="number" step="0.1" value={formData.dbh || ''} onChange={handleInputChange} placeholder="e.g., 3.2" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="treeHeight">Tree Height (m) *</Label>
                    <Input id="treeHeight" name="treeHeight" type="number" step="0.1" value={formData.treeHeight || ''} onChange={handleInputChange} placeholder="e.g., 2.5" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plotDensity">Plot Density (trees/ha) *</Label>
                    <Input id="plotDensity" name="plotDensity" type="number" value={formData.plotDensity || ''} onChange={handleInputChange} placeholder="e.g., 450" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="canopyCover">Canopy Cover (%)</Label>
                    <Input id="canopyCover" name="canopyCover" type="number" min="0" max="100" value={formData.canopyCover || ''} onChange={handleInputChange} placeholder="e.g., 75" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="survivalRate">Survival Rate (%)</Label>
                    <Input id="survivalRate" name="survivalRate" type="number" min="0" max="100" value={formData.survivalRate || ''} onChange={handleInputChange} placeholder="e.g., 92" />
                  </div>
                </div>

                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-2">Quick Add Multiple Trees</p>
                  <div className="flex gap-2">
                    <Input placeholder="Number of trees" type="number" />
                    <Button type="button" variant="outline">Add Batch</Button>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="soil" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <FileText className="h-6 w-6" />
                Soil & Sediment Analysis
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="sampleDepth">Sample Depth (cm) *</Label>
                    <Input id="sampleDepth" name="sampleDepth" type="number" step="0.1" placeholder="e.g., 30" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="bulkDensity">Bulk Density (g/cm³) *</Label>
                    <Input id="bulkDensity" name="bulkDensity" type="number" step="0.01" placeholder="e.g., 1.35" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="organicMatter">Organic Matter (%) *</Label>
                    <Input id="organicMatter" name="organicMatter" type="number" step="0.1" placeholder="e.g., 4.5" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="soc">Soil Organic Carbon - SOC (%) *</Label>
                    <Input id="soc" name="soc" type="number" step="0.1" placeholder="e.g., 2.8" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="soilPh">Soil pH</Label>
                    <Input id="soilPh" name="soilPh" type="number" step="0.1" min="0" max="14" placeholder="e.g., 7.2" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilTexture">Soil Texture</Label>
                    <Select name="soilTexture" value={formData.soilTexture || ''} onValueChange={(value) => handleSelectChange('soilTexture', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select texture" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sandy">Sandy</SelectItem>
                        <SelectItem value="loamy">Loamy</SelectItem>
                        <SelectItem value="clay">Clay</SelectItem>
                        <SelectItem value="silty">Silty</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                    <Input id="soilMoisture" name="soilMoisture" type="number" step="0.1" placeholder="e.g., 32" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilLabResults">Lab Results Upload</Label>
                  <Input id="soilLabResults" name="soilLabResults" type="file" accept=".pdf,.xlsx,.csv" />
                  <p className="text-xs text-muted-foreground">Upload detailed lab analysis results</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="hydrology" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <Droplet className="h-6 w-6" />
                Hydrology & Water Quality
              </h2>
              
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="waterTableDepth">Water Table Depth (cm) *</Label>
                    <Input id="waterTableDepth" name="waterTableDepth" type="number" step="0.1" placeholder="e.g., 15.5" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="salinity">Salinity (ppt) *</Label>
                    <Input id="salinity" name="salinity" type="number" step="0.1" placeholder="e.g., 28.3" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="waterPh">Water pH</Label>
                    <Input id="waterPh" name="waterPh" type="number" step="0.1" min="0" max="14" placeholder="e.g., 8.1" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="waterTemp">Water Temperature (°C)</Label>
                    <Input id="waterTemp" name="waterTemp" type="number" step="0.1" placeholder="e.g., 24.5" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dissolvedOxygen">Dissolved Oxygen (mg/L)</Label>
                    <Input id="dissolvedOxygen" name="dissolvedOxygen" type="number" step="0.1" placeholder="e.g., 6.8" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tidalRange">Tidal Range (m)</Label>
                  <Input id="tidalRange" name="tidalRange" type="number" step="0.1" placeholder="e.g., 1.8" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="managementEvent">Management Event Log</Label>
                  <Select name="managementEvent" value={formData.managementEvent || ''} onValueChange={(value) => handleSelectChange('managementEvent', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select event type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="planting">Planting Activity</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="disturbance">Natural Disturbance</SelectItem>
                      <SelectItem value="harvest">Harvest</SelectItem>
                      <SelectItem value="monitoring">Routine Monitoring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="photos" className="mt-6">
            <Card className="p-6">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2 text-foreground">
                <Camera className="h-6 w-6" />
                Geo-Tagged Photography
              </h2>
              
              <div className="space-y-6">
                <div className="p-4 bg-muted/30 rounded-lg">
                  <p className="text-sm font-medium mb-2">Photo Requirements:</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• All photos must be geo-tagged with GPS coordinates</li>
                    <li>• Cardinal direction photos required (North, South, East, West)</li>
                    <li>• Include date/time in EXIF data</li>
                    <li>• Minimum resolution: 1920x1080</li>
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="photoNorth">North Direction Photo *</Label>
                    <Input id="photoNorth" type="file" accept="image/*" capture="environment" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photoSouth">South Direction Photo *</Label>
                    <Input id="photoSouth" type="file" accept="image/*" capture="environment" required />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="photoEast">East Direction Photo *</Label>
                    <Input id="photoEast" type="file" accept="image/*" capture="environment" required />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="photoWest">West Direction Photo *</Label>
                    <Input id="photoWest" type="file" accept="image/*" capture="environment" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoAdditional">Additional Plot Photos</Label>
                  <Input id="photoAdditional" type="file" accept="image/*" multiple capture="environment" />
                  <p className="text-xs text-muted-foreground">
                    Upload any additional photos documenting plot conditions, species, or notable features
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="photoNotes">Photo Notes / Caption</Label>
                  <Textarea id="photoNotes" placeholder="Describe what is captured in the photos..." rows={3} />
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4 mt-6">
          <Button type="button" variant="outline" onClick={handleSaveDraft} disabled={loading}>
            {loading ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button type="submit" className="bg-gradient-ocean" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Field Data'}
          </Button>
        </div>

        {showToast && (
          <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
            Field data saved successfully!
          </div>
        )}
      </div>
    </div>
  );
};

export default FieldDataCollectionForm;