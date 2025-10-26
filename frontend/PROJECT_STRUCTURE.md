# BlueCarbonSIH Project Structure

## Completed Phase 1 ✓

### Components Added
- ✓ `src/components/ui/tubelight-navbar.tsx` - Animated navbar with tubelight effect
- ✓ `src/components/ui/interactive-hover-button.tsx` - Button with hover animations
- ✓ `src/components/ui/luma-spin.tsx` - Loading spinner component

### Design System Updates
- ✓ Added Google Fonts (Caprasimo, Crete Round, Slabo 27px) to index.html
- ✓ Updated background to pure white (#FFFFFF)
- ✓ Applied Caprasimo font to hero heading
- ✓ Applied Slabo font to body text
- ✓ Removed gradient text effects

### Dependencies Installed
- ✓ framer-motion - For animations
- ✓ lucide-react - Already installed

## Current Project Structure

```
src/
├── components/
│   ├── ui/                    # Shadcn & custom UI components
│   │   ├── tubelight-navbar.tsx
│   │   ├── interactive-hover-button.tsx
│   │   ├── luma-spin.tsx
│   │   └── ... (other shadcn components)
│   ├── Navbar.tsx
│   └── ProtectedRoute.tsx
├── contexts/
│   └── AuthContext.tsx        # Authentication state management
├── forms/                     # Methodology data collection forms
│   └── README.md             # Form specifications (created)
├── layouts/                   # Application layouts
│   └── DashboardLayout.tsx   # Dashboard wrapper (created)
├── pages/
│   ├── LandingPage.tsx       # Public landing page
│   ├── AuthPage.tsx          # Login/Register
│   ├── MarketplacePage.tsx   # Project marketplace
│   ├── UserDashboard.tsx     # Regular user dashboard
│   ├── NGODashboard.tsx      # NGO organization dashboard
│   ├── AdminDashboard.tsx    # Admin management dashboard
│   └── NotFound.tsx
├── hooks/
│   └── use-mobile.tsx
├── lib/
│   └── utils.ts
└── index.css                  # Design system tokens
```

## Phase 2 - To Be Implemented

### Navigation Integration
- [ ] Replace current Navbar with TubelightNavbar
- [ ] Add navigation items with icons
- [ ] Implement active route highlighting

### Button Updates
- [ ] Replace standard buttons with InteractiveHoverButton where appropriate
- [ ] Update CTA buttons on landing page

### Loading States
- [ ] Add LumaSpin loader to async operations
- [ ] Implement loading states in dashboards

### Parallax Image Fix
The ZoomParallax component expects 7 images but only 3 are provided. Options:
1. Add 4 more high-quality images
2. Modify component to work with fewer images
3. Duplicate existing images with different scales

### Methodology Forms (Large Task - Separate Implementation)
Each form requires:
- Multi-step/tabbed interface
- Form validation (react-hook-form + zod)
- File upload handling
- Progress saving
- Data submission to backend

Forms needed:
- [ ] VM0033Form.tsx
- [ ] VM0007Form.tsx
- [ ] GoldStandardForm.tsx
- [ ] PlanVivoForm.tsx
- [ ] IPCCForm.tsx

### Directory Structure Additions
- [ ] src/services/ - API client for backend communication
- [ ] src/types/ - TypeScript type definitions
- [ ] src/utils/ - Utility functions
- [ ] src/assets/ - Static assets (if needed)

## Usage Examples

### Using the new components:

```tsx
// Tubelight Navbar
import { TubelightNavbar } from '@/components/ui/tubelight-navbar';
import { Home, User, Briefcase, FileText } from 'lucide-react';

const navItems = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'Marketplace', url: '/marketplace', icon: Briefcase },
  { name: 'Dashboard', url: '/dashboard', icon: User },
];

<TubelightNavbar items={navItems} />

// Interactive Button
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

<InteractiveHoverButton text="Get Started" onClick={handleClick} />

// Loading Spinner
import { LumaSpin } from '@/components/ui/luma-spin';

{isLoading && <LumaSpin />}
```

## Next Steps

1. **Immediate:** Test the new components on the landing page
2. **Short-term:** Fix parallax images by adding more images or adjusting component
3. **Medium-term:** Replace buttons and implement tubelight navbar
4. **Long-term:** Build out methodology forms with proper backend integration

## Notes

- All forms should follow the design system (use semantic tokens from index.css)
- Maintain consistent validation patterns across forms
- Consider implementing a form wizard component for reusability
- Backend integration will require Lovable Cloud to be enabled
