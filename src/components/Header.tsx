import { Bell, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Badge } from '@/components/ui/badge';

export const Header = () => {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 glass-card">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h2 className="font-display text-xl font-bold text-gradient-primary">
          Betting Brain
        </h2>
      </div>
      
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-destructive text-[10px]">
            3
          </Badge>
        </Button>
        
        <Button variant="outline" className="gap-2 border-primary/20 hover:border-primary">
          <Wallet className="h-4 w-4" />
          <span className="font-semibold text-gold">$247.50</span>
        </Button>
      </div>
    </header>
  );
};
