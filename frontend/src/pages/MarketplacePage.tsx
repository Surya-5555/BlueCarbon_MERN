import { Navbar } from '@/components/Navbar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Leaf, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { mockProjects } from '@/lib/mockData';

const MarketplacePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-hero bg-clip-text text-transparent">
            Carbon Credit Marketplace
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Browse verified blue carbon projects and purchase credits to offset your carbon footprint
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockProjects.filter(p => p.status === 'approved').map((project) => (
            <Card key={project.id} className="overflow-hidden hover:shadow-ocean transition-all duration-300 animate-fade-in">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                />
                {project.verified && (
                  <Badge className="absolute top-3 right-3 bg-success">
                    Verified
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg">{project.name}</CardTitle>
                <CardDescription className="flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {project.location}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-primary">${project.price}</p>
                    <p className="text-xs text-muted-foreground">per credit</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold flex items-center gap-1">
                      <Leaf className="h-4 w-4 text-success" />
                      {project.available.toLocaleString()}
                    </p>
                    <p className="text-xs text-muted-foreground">available</p>
                  </div>
                </div>
              </CardContent>
              
              <CardFooter className="gap-2">
                <Link to={`/project/${project.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
                <Button className="bg-gradient-ocean" size="icon">
                  <ShoppingCart className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketplacePage;
