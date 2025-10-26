import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Camera, MapPin, Droplet, Leaf, FileText } from 'lucide-react';
import { toast } from 'sonner';

const FieldDataCollectionForm = () => {
  const [currentTab, setCurrentTab] = useState('basic');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Field data saved successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Field Data Collection</h1>
          <p className="text-muted-foreground">Record measurements and observations from the field</p>
        </div>

        <form onSubmit={handleSubmit}>
          <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="vegetation">Vegetation</TabsTrigger>
              <TabsTrigger value="soil">Soil Data</TabsTrigger>
              <TabsTrigger value="hydrology">Hydrology</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
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
                      <Input id="plotId" placeholder="e.g., MG-045-A" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="collectionDate">Collection Date *</Label>
                      <Input id="collectionDate" type="date" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="gpsLat">GPS Latitude *</Label>
                      <Input id="gpsLat" type="number" step="0.000001" placeholder="Auto-captured" required />
                      <Button type="button" variant="outline" size="sm" className="mt-2">
                        <MapPin className="mr-2 h-4 w-4" />
                        Capture GPS
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="gpsLong">GPS Longitude *</Label>
                      <Input id="gpsLong" type="number" step="0.000001" placeholder="Auto-captured" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="plotNotes">Plot Notes</Label>
                    <Textarea id="plotNotes" placeholder="Any observations about the plot conditions..." rows={4} />
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
                    <Select>
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
                      <Input id="dbh" type="number" step="0.1" placeholder="e.g., 3.2" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="treeHeight">Tree Height (m) *</Label>
                      <Input id="treeHeight" type="number" step="0.1" placeholder="e.g., 2.5" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="plotDensity">Plot Density (trees/ha) *</Label>
                      <Input id="plotDensity" type="number" placeholder="e.g., 450" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="canopyCover">Canopy Cover (%)</Label>
                      <Input id="canopyCover" type="number" min="0" max="100" placeholder="e.g., 75" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="survivalRate">Survival Rate (%)</Label>
                      <Input id="survivalRate" type="number" min="0" max="100" placeholder="e.g., 92" />
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
                      <Input id="sampleDepth" type="number" step="0.1" placeholder="e.g., 30" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="bulkDensity">Bulk Density (g/cm³) *</Label>
                      <Input id="bulkDensity" type="number" step="0.01" placeholder="e.g., 1.35" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="organicMatter">Organic Matter (%) *</Label>
                      <Input id="organicMatter" type="number" step="0.1" placeholder="e.g., 4.5" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="soc">Soil Organic Carbon - SOC (%) *</Label>
                      <Input id="soc" type="number" step="0.1" placeholder="e.g., 2.8" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="soilPh">Soil pH</Label>
                      <Input id="soilPh" type="number" step="0.1" min="0" max="14" placeholder="e.g., 7.2" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soilTexture">Soil Texture</Label>
                      <Select>
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
                      <Input id="soilMoisture" type="number" step="0.1" placeholder="e.g., 32" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="soilLabResults">Lab Results Upload</Label>
                    <Input id="soilLabResults" type="file" accept=".pdf,.xlsx,.csv" />
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
                      <Input id="waterTableDepth" type="number" step="0.1" placeholder="e.g., 15.5" required />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="salinity">Salinity (ppt) *</Label>
                      <Input id="salinity" type="number" step="0.1" placeholder="e.g., 28.3" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="waterPh">Water pH</Label>
                      <Input id="waterPh" type="number" step="0.1" min="0" max="14" placeholder="e.g., 8.1" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="waterTemp">Water Temperature (°C)</Label>
                      <Input id="waterTemp" type="number" step="0.1" placeholder="e.g., 24.5" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dissolvedOxygen">Dissolved Oxygen (mg/L)</Label>
                      <Input id="dissolvedOxygen" type="number" step="0.1" placeholder="e.g., 6.8" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tidalRange">Tidal Range (m)</Label>
                    <Input id="tidalRange" type="number" step="0.1" placeholder="e.g., 1.8" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="managementEvent">Management Event Log</Label>
                    <Select>
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
            <Button type="button" variant="outline">
              Save Draft
            </Button>
            <Button type="submit" className="bg-gradient-ocean">
              Submit Field Data
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FieldDataCollectionForm;
