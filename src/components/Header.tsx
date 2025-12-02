import { Bell, Wallet, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/components/ThemeProvider';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const [balance] = useLocalStorage('WALLET_BALANCE', null);
  const [notifications] = useLocalStorage('notificationCount', null);

  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 glass-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <img 
          src="/android-chrome-512x512.png" 
          alt="Betting Brain Logo" 
          className="h-20 w-20 object-contain"
        />
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notifications !== null && notifications > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-[10px]">
              {notifications}
            </Badge>
          )}
        </Button>

        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className="hover:bg-primary/10"
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? (
            <Sun className="h-5 w-5 text-gold" />
          ) : (
            <Moon className="h-5 w-5 text-primary" />
          )}
        </Button>
        
        {balance !== null && (
          <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary">
            <Wallet className="h-4 w-4" />
            <span className="font-semibold text-gold">TSH {balance.toLocaleString()}</span>
          </Button>
        )}
      </div>
    </header>
  );
};
