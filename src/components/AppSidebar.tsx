import { 
  Home, TrendingUp, ShoppingBag, Wallet, Users, 
  Gift, Brain, FileText, DollarSign, Award, 
  UserCheck, BarChart3, AlertTriangle, Flag,
  Shield, Settings, Lock, LogOut
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRole } from '@/components/RoleProvider';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const userNavItems = [
  { title: 'Home', url: '/', icon: Home },
  { title: 'Trending Slips', url: '/trending', icon: TrendingUp },
  { title: 'Purchased Slips', url: '/purchased', icon: ShoppingBag },
  { title: 'Wallet', url: '/wallet', icon: Wallet },
  { title: 'Referrals', url: '/referrals', icon: Users },
  { title: 'Free Daily Brain', url: '/free-daily', icon: Gift },
];

const tipsterNavItems = [
  { title: 'Create Slip', url: '/create-slip', icon: FileText },
  { title: 'Revenue', url: '/revenue', icon: DollarSign },
  { title: 'BrainScore', url: '/brainscore', icon: Brain },
  { title: 'Badges', url: '/badges', icon: Award },
  { title: 'Followers', url: '/followers', icon: Users },
];

const adminNavItems = [
  { title: 'Verify Tipsters', url: '/verify-tipsters', icon: UserCheck },
  { title: 'Finance Dashboard', url: '/finance', icon: BarChart3 },
  { title: 'Withdrawals', url: '/withdrawals', icon: DollarSign },
  { title: 'Dispute Center', url: '/disputes', icon: AlertTriangle },
  { title: 'Reports', url: '/reports', icon: Flag },
];

const superAdminNavItems = [
  { title: 'Audit Log', url: '/audit-log', icon: Shield },
  { title: 'ProofChain', url: '/proofchain', icon: Lock },
  { title: 'Global Settings', url: '/settings', icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    // Clear user data/session here if needed
    navigate('/auth');
  };

  const getNavItems = () => {
    let items = [...userNavItems];
    
    if (role === 'tipster' || role === 'admin' || role === 'super_admin') {
      items = [...items, ...tipsterNavItems];
    }
    
    if (role === 'admin' || role === 'super_admin') {
      items = [...items, ...adminNavItems];
    }
    
    if (role === 'super_admin') {
      items = [...items, ...superAdminNavItems];
    }
    
    return items;
  };

  const navItems = getNavItems();

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent>
        {!isCollapsed && (
          <div className="p-4">
            <Select value={role} onValueChange={(value) => setRole(value as any)}>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="user">User</SelectItem>
                <SelectItem value="tipster">Tipster</SelectItem>
                <SelectItem value="admin">Admin</SelectItem>
                <SelectItem value="super_admin">Super Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                          isActive
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!isCollapsed && (
                          <span className="font-medium">{item.title}</span>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      
      <SidebarFooter>
        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full gap-2 justify-center"
        >
          <LogOut className="h-4 w-4" />
          {!isCollapsed && <span>Logout</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
