import { useLoading } from '@/context/LoadingContext';

export const LoadingOverlay = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center z-50">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Logo */}
        <div className="p-6 bg-gradient-to-br from-primary/30 to-gold/30 rounded-3xl shadow-2xl animate-pulse">
          <img
            src="/apple-touch-icon.png"
            alt="Betting Brain"
            className="h-24 w-24 rounded-2xl shadow-lg"
          />
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent">
            Loading...
          </h2>
          <p className="text-muted-foreground mt-2 text-sm">
            Initializing Betting Brain
          </p>
        </div>

        {/* Loading Animation - Dots */}
        <div className="flex gap-3 mt-6">
          <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="h-3 w-3 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-3 w-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>

        {/* Progress Bar */}
        <div className="w-48 h-1 bg-slate-700 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-gradient-to-r from-primary to-gold animate-pulse" style={{ width: '70%' }}></div>
        </div>
      </div>
    </div>
  );
};
