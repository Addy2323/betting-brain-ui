import { 
  Home, TrendingUp, ShoppingBag, Wallet, Users, 
  Gift, Brain, FileText, DollarSign, Award, 
  UserCheck, BarChart3, AlertTriangle, Flag,
  Shield, Settings, Lock, LogOut
} from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRole } from '@/components/RoleProvider';
import { useAuth } from '@/context/AuthContext';
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

const userNavItems = [
  { title: 'Home', url: '/index', icon: Home },
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
  const { state, toggleSidebar } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { role, setRole } = useRole();
  const { user, logout } = useAuth();
  const isCollapsed = state === 'collapsed';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNavClick = () => {
    // Close sidebar on mobile when a nav item is clicked
    if (!isCollapsed && window.innerWidth < 1024) {
      toggleSidebar();
    }
  };


  const getNavItems = () => {
    // Use user's actual role from AuthContext
    const userRole = user?.role || 'user';
    
    switch (userRole) {
      case 'tipster':
        // Tipster sees ONLY tipster items
        return tipsterNavItems;
      
      case 'admin':
        // Admin sees ONLY admin items
        return adminNavItems;
      
      case 'super_admin':
        // Super Admin sees ONLY super admin items
        return superAdminNavItems;
      
      default:
        // Regular user sees only user items
        return userNavItems;
    }
  };

  const navItems = getNavItems();

  return (
    <Sidebar className={isCollapsed ? 'w-16' : 'w-64'} collapsible="icon">
      <SidebarContent>
        {!isCollapsed && (
          <div className="p-4 space-y-4">
            {/* User Info */}
            <div className="bg-slate-800/50 rounded-lg p-3 border border-primary/20">
              <p className="text-xs text-muted-foreground mb-1">Logged in as</p>
              <p className="text-sm font-semibold text-primary">{user?.fullName}</p>
              <p className="text-xs text-muted-foreground capitalize">
                {user?.role === 'super_admin' ? 'Super Admin' : user?.role}
              </p>
            </div>

          </div>
        )}

        <SidebarGroup>
          <SidebarGroupLabel className={isCollapsed ? 'sr-only' : ''}>
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Other Navigation Items */}
              {navItems.map((item) => {
                const isActive = location.pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <NavLink
                        to={item.url}
                        onClick={handleNavClick}
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
