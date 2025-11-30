import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLoading } from '@/context/LoadingContext';

const Splash = () => {
  const navigate = useNavigate();
  const { setIsLoading } = useLoading();
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    // Show text after a short delay
    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 300);

    // Stop loading and navigate to auth after 7 seconds
    const navigationTimer = setTimeout(() => {
      setIsLoading(false);
      navigate('/auth');
    }, 7000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(navigationTimer);
    };
  }, [navigate, setIsLoading]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="flex flex-col items-center justify-center gap-8">
        {/* Logo */}
        <div className="p-6 bg-gradient-to-br from-primary/30 to-gold/30 rounded-3xl shadow-2xl animate-pulse">
          <img
            src="/apple-touch-icon.png"
            alt="Betting Brain"
            className="h-32 w-32 rounded-2xl shadow-lg"
          />
        </div>

        {/* Amazing Loaded Text */}
        <div className="text-center">
          <h1
            className={`text-5xl font-bold bg-gradient-to-r from-primary via-gold to-primary bg-clip-text text-transparent transition-all duration-1000 ${
              showText ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            
          </h1>
          <p className="text-muted-foreground mt-4 text-lg">
            Welcome to Betting Brain
          </p>
        </div>

        {/* Loading Animation */}
        <div className="flex gap-2 mt-8">
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="h-2 w-2 bg-gold rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="h-2 w-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;
