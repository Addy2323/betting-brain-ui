import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="mb-6 p-4 bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-2xl w-fit mx-auto">
          <Lock className="h-16 w-16 text-red-500" />
        </div>
        <h1 className="text-4xl font-bold text-gradient-primary mb-4">
          Access Denied
        </h1>
        <p className="text-muted-foreground mb-8">
          You don't have permission to access this page. Your current role doesn't have the required access level.
        </p>
        <div className="space-y-3">
          <Button
            onClick={() => navigate('/home')}
            className="w-full bg-gradient-to-r from-primary to-gold"
          >
            Go to Dashboard
          </Button>
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="w-full border-primary/20"
          >
            Go Back
          </Button>
        </div>
      </div>
    </div>
  );
}
