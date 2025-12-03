import { useState } from 'react';
import { UserPlus, Mail, Phone, MapPin, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface Tipster {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  country: string;
  verified: boolean;
  createdAt: string;
  status: 'active' | 'inactive' | 'suspended';
}

export default function AddTipster() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    country: '',
  });

  const [tipsters, setTipsters] = useLocalStorage<Tipster[]>('adminTipsters', []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast({
        title: "Missing Field",
        description: "Please enter tipster's full name",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.phone.trim()) {
      toast({
        title: "Missing Field",
        description: "Please enter phone number",
        variant: "destructive",
      });
      return false;
    }
    if (!formData.country.trim()) {
      toast({
        title: "Missing Field",
        description: "Please enter country",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newTipster: Tipster = {
      id: Date.now().toString(),
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      country: formData.country,
      verified: true,
      createdAt: new Date().toISOString(),
      status: 'active',
    };

    const updatedTipsters = [...tipsters, newTipster];
    setTipsters(updatedTipsters);

    toast({
      title: "Tipster Added",
      description: `${formData.fullName} has been successfully added as a tipster`,
    });

    setFormData({
      fullName: '',
      email: '',
      phone: '',
      country: '',
    });
  };

  const handleDelete = (id: string) => {
    const updatedTipsters = tipsters.filter(t => t.id !== id);
    setTipsters(updatedTipsters);
    toast({
      title: "Tipster Removed",
      description: "Tipster has been removed from the system",
    });
  };

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <UserPlus className="h-8 w-8 text-primary flex-shrink-0" />
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Add New Tipster
          </h1>
          <p className="text-sm text-muted-foreground">Register and manage tipsters in the system</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <Card className="glass-card p-6 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold">Full Name *</Label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="Enter tipster's full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="h-11 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  type="email"
                  name="email"
                  placeholder="tipster@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone Number *
                </Label>
                <Input
                  type="tel"
                  name="phone"
                  placeholder="+255 123 456 789"
                  value={formData.phone}
                  onChange={handleChange}
                  className="h-11 text-sm"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Country *
                </Label>
                <Input
                  type="text"
                  name="country"
                  placeholder="Tanzania"
                  value={formData.country}
                  onChange={handleChange}
                  className="h-11 text-sm"
                />
              </div>

              <Button
                type="submit"
                className="w-full h-11 text-sm bg-gradient-to-r from-primary to-accent font-semibold"
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Add Tipster
              </Button>
            </form>
          </Card>
        </div>

        {/* Stats Section */}
        <div className="space-y-4">
          <Card className="glass-card p-6 border-primary/20">
            <div className="text-sm text-muted-foreground mb-2">Total Tipsters</div>
            <div className="text-3xl font-bold text-primary">{tipsters.length}</div>
            <div className="text-xs text-muted-foreground mt-2">In system</div>
          </Card>

          <Card className="glass-card p-6 border-green-500/20">
            <div className="text-sm text-muted-foreground mb-2">Active</div>
            <div className="text-3xl font-bold text-green-500">
              {tipsters.filter(t => t.status === 'active').length}
            </div>
            <div className="text-xs text-muted-foreground mt-2">Verified</div>
          </Card>

          <Card className="glass-card p-6 border-yellow-500/20">
            <div className="text-sm text-muted-foreground mb-2">Inactive</div>
            <div className="text-3xl font-bold text-yellow-500">
              {tipsters.filter(t => t.status === 'inactive').length}
            </div>
            <div className="text-xs text-muted-foreground mt-2">Suspended</div>
          </Card>
        </div>
      </div>

      {/* Tipsters List */}
      <Card className="glass-card p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-primary" />
          <h2 className="text-xl font-bold">Registered Tipsters</h2>
        </div>

        {tipsters.length > 0 ? (
          <div className="space-y-3">
            {tipsters.map((tipster) => (
              <div
                key={tipster.id}
                className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-center justify-between hover:border-primary/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                      {tipster.fullName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{tipster.fullName}</p>
                      <p className="text-xs text-muted-foreground">{tipster.email}</p>
                    </div>
                  </div>
                  <div className="text-xs text-muted-foreground space-x-4">
                    <span>📱 {tipster.phone}</span>
                    <span>📍 {tipster.country}</span>
                    <span>📅 {new Date(tipster.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    tipster.status === 'active' ? 'bg-green-500/20 text-green-500' :
                    tipster.status === 'inactive' ? 'bg-yellow-500/20 text-yellow-500' :
                    'bg-red-500/20 text-red-500'
                  }`}>
                    {tipster.status.charAt(0).toUpperCase() + tipster.status.slice(1)}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive"
                    onClick={() => handleDelete(tipster.id)}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <UserPlus className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
            <p className="text-muted-foreground mb-4">No tipsters added yet</p>
            <p className="text-sm text-muted-foreground">Use the form above to add your first tipster</p>
          </div>
        )}
      </Card>
    </div>
  );
}
