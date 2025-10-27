// Mock data for the BlueCarbonSIH platform

export interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  longDescription: string;
  price: number;
  available: number;
  sold: number;
  image: string;
  verified: boolean;
  methodology: string;
  status: 'approved' | 'pending' | 'rejected';
  ngoId: string;
  ngoName: string;
  startDate: string;
  area: number;
  certifications: string[];
  documents: { name: string; url: string }[];
}

export interface CreditPurchase {
  id: string;
  projectId: string;
  projectName: string;
  credits: number;
  pricePerCredit: number;
  total: number;
  date: string;
  status: 'active' | 'retired';
  certificateUrl?: string;
}

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Mangrove Restoration - Kerala',
    location: 'Kerala, India',
    description: 'Restoring 500 hectares of mangrove forests along the Kerala coastline.',
    longDescription: 'This comprehensive mangrove restoration project aims to restore 500 hectares of degraded coastal mangrove ecosystems in Kerala. The project employs community-based restoration techniques, engaging local communities in planting and monitoring activities. Mangroves are critical for coastal protection, biodiversity, and carbon sequestration, making this project vital for climate change mitigation.',
    price: 25,
    available: 10000,
    sold: 2500,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
    verified: true,
    methodology: 'VM0033',
    status: 'approved',
    ngoId: 'ngo1',
    ngoName: 'Coastal Conservation India',
    startDate: '2023-01-15',
    area: 500,
    certifications: ['Verified Carbon Standard', 'Gold Standard'],
    documents: [
      { name: 'Project Design Document', url: '#' },
      { name: 'Verification Report 2024', url: '#' },
    ],
  },
  {
    id: '2',
    name: 'Seagrass Conservation - Goa',
    location: 'Goa, India',
    description: 'Protecting and expanding seagrass meadows in Goan coastal waters.',
    longDescription: 'Our seagrass conservation project in Goa focuses on protecting and expanding critical seagrass meadows along the coast. These underwater ecosystems are powerful carbon sinks and provide essential habitat for marine life. The project includes water quality monitoring, protection from destructive fishing practices, and active restoration efforts.',
    price: 30,
    available: 7500,
    sold: 1200,
    image: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=800&h=600&fit=crop',
    verified: true,
    methodology: 'VM0007',
    status: 'approved',
    ngoId: 'ngo1',
    ngoName: 'Coastal Conservation India',
    startDate: '2023-03-20',
    area: 300,
    certifications: ['Verified Carbon Standard'],
    documents: [
      { name: 'Project Design Document', url: '#' },
      { name: 'Monitoring Report Q1 2024', url: '#' },
    ],
  },
  {
    id: '3',
    name: 'Salt Marsh Protection - Sundarbans',
    location: 'West Bengal, India',
    description: 'Conserving critical salt marsh habitats in the Sundarbans delta.',
    longDescription: 'The Sundarbans Salt Marsh Protection project safeguards one of the world\'s most important coastal ecosystems. This project protects existing salt marshes from degradation while restoring damaged areas. Salt marshes are highly efficient carbon sinks and provide crucial storm protection for coastal communities.',
    price: 35,
    available: 5002,
    sold: 3000,
    image: 'https://images.unsplash.com/photo-1621451537084-482c73073a0f?w=800&h=600&fit=crop',
    verified: true,
    methodology: 'Gold Standard',
    status: 'approved',
    ngoId: 'ngo2',
    ngoName: 'Bengal Blue Initiative',
    startDate: '2022-11-10',
    area: 450,
    certifications: ['Gold Standard', 'Climate Action Reserve'],
    documents: [
      { name: 'Project Design Document', url: '#' },
      { name: 'Annual Report 2023', url: '#' },
    ],
  },
  {
    id: '4',
    name: 'Coastal Wetland Revival - Odisha',
    location: 'Odisha, India',
    description: 'Reviving degraded coastal wetlands to enhance biodiversity.',
    longDescription: 'This wetland revival project in Odisha targets 350 hectares of degraded coastal wetlands. By restoring hydrological connectivity and native vegetation, we\'re bringing back critical habitat for migratory birds and marine species while significantly increasing carbon sequestration capacity.',
    price: 28,
    available: 8500,
    sold: 1500,
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop',
    verified: true,
    methodology: 'Plan Vivo',
    status: 'approved',
    ngoId: 'ngo2',
    ngoName: 'Bengal Blue Initiative',
    startDate: '2023-06-01',
    area: 350,
    certifications: ['Plan Vivo'],
    documents: [
      { name: 'Project Design Document', url: '#' },
    ],
  },
];

export const mockUserCredits: CreditPurchase[] = [
  {
    id: 'p1',
    projectId: '1',
    projectName: 'Mangrove Restoration - Kerala',
    credits: 100,
    pricePerCredit: 25,
    total: 2500,
    date: '2024-01-15',
    status: 'active',
  },
  {
    id: 'p2',
    projectId: '2',
    projectName: 'Seagrass Conservation - Goa',
    credits: 50,
    pricePerCredit: 30,
    total: 1500,
    date: '2024-02-20',
    status: 'active',
  },
  {
    id: 'p3',
    projectId: '3',
    projectName: 'Salt Marsh Protection - Sundarbans',
    credits: 75,
    pricePerCredit: 35,
    total: 2625,
    date: '2023-12-10',
    status: 'retired',
    certificateUrl: '#retirement-certificate',
  },
];
