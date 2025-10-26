import { useParams, Link } from 'react-router-dom';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Calendar, Leaf, ShieldCheck, FileText, ArrowLeft, ShoppingCart } from 'lucide-react';
import { mockProjects } from '@/lib/mockData';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

const ProjectDetailPage = () => {
  const { id } = useParams();
  const project = mockProjects.find(p => p.id === id);
  const [quantity, setQuantity] = useState(1);
  const { toast } = useToast();

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container mx-auto px-4 pt-24 pb-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
          <Link to="/marketplace">
            <Button>Back to Marketplace</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} credits from ${project.name} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <Link to="/marketplace" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          <div className="relative h-96 rounded-xl overflow-hidden">
            <img
              src={project.image}
              alt={project.name}
              className="w-full h-full object-cover"
            />
            {project.verified && (
              <Badge className="absolute top-4 right-4 bg-success">
                <ShieldCheck className="h-3 w-3 mr-1" />
                Verified
              </Badge>
            )}
          </div>

          <div>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
                <p className="flex items-center gap-2 text-foreground/70">
                  <MapPin className="h-4 w-4" />
                  {project.location}
                </p>
              </div>
              <Badge variant="outline" className="text-lg">
                {project.methodology}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Price per Credit</CardDescription>
                  <CardTitle className="text-3xl text-primary">${project.price}</CardTitle>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardDescription>Available Credits</CardDescription>
                  <CardTitle className="text-3xl flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-success" />
                    {project.available.toLocaleString()}
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>

            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Purchase Credits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Quantity</label>
                    <input
                      type="number"
                      min="1"
                      max={project.available}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="text-sm font-medium mb-2 block">Total</label>
                    <div className="text-2xl font-bold text-primary">
                      ${(quantity * project.price).toLocaleString()}
                    </div>
                  </div>
                </div>
                <Button onClick={handleAddToCart} className="w-full" size="lg">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-foreground/70" />
                <span>Started: {new Date(project.startDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Leaf className="h-4 w-4 text-foreground/70" />
                <span>Area: {project.area} hectares</span>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="ngo">NGO Information</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Project Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/80 leading-relaxed">{project.longDescription}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Credits Sold</p>
                    <p className="text-2xl font-bold">{project.sold.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">CO₂ Offset</p>
                    <p className="text-2xl font-bold">{project.sold} tons</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Project Area</p>
                    <p className="text-2xl font-bold">{project.area} ha</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certifications">
            <Card>
              <CardHeader>
                <CardTitle>Certifications & Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.certifications.map((cert, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
                      <ShieldCheck className="h-5 w-5 text-success" />
                      <span className="font-medium">{cert}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents">
            <Card>
              <CardHeader>
                <CardTitle>Project Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {project.documents.map((doc, index) => (
                    <a
                      key={index}
                      href={doc.url}
                      className="flex items-center gap-3 p-3 border rounded-lg hover:bg-muted transition-colors"
                    >
                      <FileText className="h-5 w-5 text-primary" />
                      <span className="font-medium">{doc.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ngo">
            <Card>
              <CardHeader>
                <CardTitle>NGO Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Organization Name</p>
                    <p className="text-xl font-semibold">{project.ngoName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Project Methodology</p>
                    <p className="font-medium">{project.methodology}</p>
                  </div>
                  <div>
                    <p className="text-sm text-foreground/70 mb-1">Verification Status</p>
                    <Badge className="bg-success">Verified & Approved</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
