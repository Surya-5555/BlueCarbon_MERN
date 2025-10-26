import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { apiClient } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/hooks/use-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const UserManagement = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getAllUsers();
      if (response.success && response.data) {
        setUsers(response.data.users);
      }
    } catch (error) {
      console.error('Failed to fetch users:', error);
      toast({
        title: "Error",
        description: "Failed to fetch users",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      setUpdating(userId);
      const response = await apiClient.updateUserRole(userId, newRole);
      if (response.success) {
        toast({
          title: "Success",
          description: `User role updated to ${newRole}`,
        });
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to update role:', error);
      toast({
        title: "Error",
        description: "Failed to update user role",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const handleStatusToggle = async (userId: string) => {
    try {
      setUpdating(userId);
      const response = await apiClient.toggleUserStatus(userId);
      if (response.success) {
        toast({
          title: "Success",
          description: response.message,
        });
        fetchUsers(); // Refresh the list
      }
    } catch (error) {
      console.error('Failed to toggle status:', error);
      toast({
        title: "Error",
        description: "Failed to toggle user status",
        variant: "destructive",
      });
    } finally {
      setUpdating(null);
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-100 text-red-800';
      case 'ngo': return 'bg-green-100 text-green-800';
      case 'verifier': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Card>
        <CardHeader>
          <CardTitle>User Management</CardTitle>
          <CardDescription>
            Manage user roles and status. Changes will be reflected in real-time for affected users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((userData) => (
              <Card key={userData.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold">{userData.name}</h3>
                      <Badge className={getRoleColor(userData.role)}>
                        {userData.role}
                      </Badge>
                      <Badge variant={userData.isActive ? "default" : "secondary"}>
                        {userData.isActive ? "Active" : "Inactive"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                    <p className="text-xs text-gray-500">
                      Created: {new Date(userData.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Select
                      value={userData.role}
                      onValueChange={(newRole) => handleRoleChange(userData.id, newRole)}
                      disabled={updating === userData.id}
                    >
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="user">User</SelectItem>
                        <SelectItem value="ngo">NGO</SelectItem>
                        <SelectItem value="verifier">Verifier</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                    
                    <Button
                      variant={userData.isActive ? "destructive" : "default"}
                      size="sm"
                      onClick={() => handleStatusToggle(userData.id)}
                      disabled={updating === userData.id}
                    >
                      {updating === userData.id ? "..." : userData.isActive ? "Deactivate" : "Activate"}
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
