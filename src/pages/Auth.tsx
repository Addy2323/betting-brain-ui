import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { usePageLoading } from '@/hooks/usePageLoading';

type AuthMode = 'login' | 'signup';

const Auth = () => {
  usePageLoading();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle authentication logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-6 p-4 bg-gradient-to-br from-primary/20 to-gold/20 rounded-2xl">
            <img
              src="/apple-touch-icon.png"
              alt="Betting Brain Logo"
              className="h-20 w-20 rounded-xl shadow-lg"
            />
          </div>
          <h1 className="text-3xl font-bold text-gradient-primary mb-2">
            Betting Brain
          </h1>
          <p className="text-muted-foreground text-center">
            {mode === 'login'
              ? 'Welcome back! Sign in to your account'
              : 'Join Africa\'s most trusted betting tips marketplace'}
          </p>
        </div>

        {/* Auth Card */}
        <Card className="glass-card p-8 border border-primary/20">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name - Signup Only */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Full Name
                </label>
                <Input
                  type="text"
                  name="fullName"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-primary/20 focus:border-primary"
                  required
                />
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Email Address
              </label>
              <Input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleInputChange}
                className="bg-slate-700/50 border-primary/20 focus:border-primary"
                required
              />
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Password
              </label>
              <div className="relative">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="bg-slate-700/50 border-primary/20 focus:border-primary pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password - Signup Only */}
            {mode === 'signup' && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">
                  Confirm Password
                </label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="bg-slate-700/50 border-primary/20 focus:border-primary pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* Forgot Password - Login Only */}
            {mode === 'login' && (
              <div className="flex justify-end">
                <button
                  type="button"
                  className="text-sm text-primary hover:text-gold transition-colors"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-gold hover:shadow-lg hover:shadow-primary/50 text-white font-semibold py-2"
            >
              {mode === 'login' ? 'Sign In' : 'Create Account'}
            </Button>

            {/* Toggle Mode */}
            <div className="text-center text-sm text-muted-foreground">
              {mode === 'login' ? (
                <>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className="text-primary hover:text-gold transition-colors font-semibold"
                  >
                    Sign up
                  </button>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="text-primary hover:text-gold transition-colors font-semibold"
                  >
                    Sign in
                  </button>
                </>
              )}
            </div>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primary/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              className="border-primary/20 hover:border-primary hover:bg-primary/10"
            >
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              className="border-primary/20 hover:border-primary hover:bg-primary/10"
            >
              Apple
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          By signing in, you agree to our{' '}
          <a href="#" className="text-primary hover:text-gold">
            Terms of Service
          </a>{' '}
          and{' '}
          <a href="#" className="text-primary hover:text-gold">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
};

export default Auth;
