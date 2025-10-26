import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth, UserRole } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Icons } from '@/components/ui/icons';
import { motion } from 'framer-motion';

const AuthPage = () => {
  const navigate = useNavigate();
  const { login, register, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);

  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({
    email: '',
    password: '',
    name: '',
    role: 'user' as UserRole,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(loginData.email, loginData.password);
      toast.success('Welcome back!');
      navigate('/marketplace');
    } catch (error) {
      toast.error('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await register(registerData.email, registerData.password, registerData.name, registerData.role);
      toast.success('Account created successfully!');
      navigate('/marketplace');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-sky p-4 relative overflow-hidden">
      {/* Background Decoration */}
      <div
        className="absolute right-0 top-0 z-0 size-[50vw]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='2' stroke='rgb(30 58 138 / 0.5)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(100% 100% at 100% 0%, rgba(255,255,255,0), rgba(255,255,255,1))",
          }}
        />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.25, ease: "easeInOut" }}
        className="relative z-10 w-full max-w-md bg-background/95 backdrop-blur-sm rounded-lg shadow-ocean border p-8"
      >
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Icons.logo className="w-20 h-20 object-contain" />
        </div>

        {/* Header */}
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold mb-2">BlueCarbonSIH</h1>
          <p className="text-muted-foreground">
            Sign in to your account or{" "}
            <span className="text-primary font-medium">create one</span>
          </p>
        </div>

        {/* Login Form */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your.email@provider.com"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="mt-1.5"
                  required
                />
              </div>
              <div>
                <div className="flex items-end justify-between mb-1.5">
                  <Label htmlFor="password" className="text-muted-foreground">
                    Password
                  </Label>
                  <a href="#" className="text-sm text-primary hover:underline">
                    Forgot?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••••••"
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  required
                />
              </div>
            </div>

            <Button
              onClick={handleLogin}
              className="w-full bg-gradient-ocean"
              disabled={loading}
            >
              Sign in
            </Button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px w-full bg-border" />
              <span className="text-muted-foreground text-sm">OR</span>
              <div className="h-px w-full bg-border" />
            </div>

            {/* Register Section */}
            <div className="space-y-4">
              <div>
                <Label htmlFor="register-name" className="text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="register-name"
                  type="text"
                  placeholder="John Doe"
                  value={registerData.name}
                  onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="register-email" className="text-muted-foreground">
                  Email
                </Label>
                <Input
                  id="register-email"
                  type="email"
                  placeholder="you@example.com"
                  value={registerData.email}
                  onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="register-password" className="text-muted-foreground">
                  Password
                </Label>
                <Input
                  id="register-password"
                  type="password"
                  placeholder="••••••••••••"
                  value={registerData.password}
                  onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                  className="mt-1.5"
                />
              </div>
              <div>
                <Label htmlFor="register-role" className="text-muted-foreground">
                  Account Type
                </Label>
                <Select
                  value={registerData.role}
                  onValueChange={(value: UserRole) => setRegisterData({ ...registerData, role: value })}
                >
                  <SelectTrigger id="register-role" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user">Regular User</SelectItem>
                    <SelectItem value="ngo">NGO Representative</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button
                onClick={handleRegister}
                className="w-full bg-gradient-ocean"
                disabled={loading}
              >
                Create Account
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center mt-6">
              By signing in, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AuthPage;
