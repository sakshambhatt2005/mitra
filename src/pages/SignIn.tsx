import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SignIn = () => {
  const { translate } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        toast.success('Successfully signed in!');
        navigate('/dashboard');
      } else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      toast.error('An error occurred during sign in');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-mitra-beige to-white p-4">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMxLjIgMCAyLjMuNCAzLjIgMS4yLjkuOCAxLjMgMS44IDEuMyAzIDAgMS4yLS40IDIuMy0xLjMgMy4xLS45LjktMiAxLjMtMy4yIDEuMy0xLjIgMC0yLjMtLjQtMy4yLTEuMy0uOS0uOC0xLjMtMS45LTEuMy0zLjEgMC0xLjIuNC0yLjIgMS4zLTMgLjktLjggMi0xLjIgMy4yLTEuMnptLTE1IDkuNWMxLjIgMCAyLjMuNCAzLjIgMS4zLjkuOCAxLjMgMS44IDEuMyAzcy0uNCAyLjEtMS4zIDNjLS45LjktMiAxLjMtMy4yIDEuMy0xLjIgMC0yLjMtLjQtMy4yLTEuMy0uOS0uOS0xLjMtMS44LTEuMy0zcy40LTIuMiAxLjMtM2MuOS0uOSAyLTEuMyAzLjItMS4zem0xNSAxMi4zYzEuMiAwIDIuMy40IDMuMiAxLjMuOS44IDEuMyAxLjggMS4zIDNzLS40IDIuMS0xLjMgM2MtLjkuOS0yIDEuMy0zLjIgMS4zLTEuMiAwLTIuMy0uNC0zLjItMS4zLS45LS45LTEuMy0xLjgtMS4zLTNzLjQtMi4yIDEuMy0zYy45LS45IDItMS4zIDMuMi0xLjN6bS0xNS0yNi4xYzEuMiAwIDIuMy40IDMuMiAxLjMuOS44IDEuMyAxLjggMS4zIDNzLS40IDIuMS0xLjMgM2MtLjkuOS0yIDEuMy0zLjIgMS4zLTEuMiAwLTIuMy0uNC0zLjItMS4zLS45LS45LTEuMy0xLjgtMS4zLTNzLjQtMi4yIDEuMy0zYy45LS45IDItMS4zIDMuMi0xLjN6IiBmaWxsPSIjM0U2QjQ4IiBmaWxsLW9wYWNpdHk9Ii4xIi8+PC9nPjwvc3ZnPg==')] opacity-10 pointer-events-none"></div>

      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <img 
              src="/mitra logo.PNG" 
              alt="Mitra Logo" 
              className="h-10 w-auto"
            />
            <span className="font-heading text-2xl font-medium">{translate('appName')}</span>
          </Link>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-heading text-center">{translate('login')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">{translate('email')}</Label>
                <Input
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">{translate('password')}</Label>
                  <Link to="/forgot-password" className="text-sm text-mitra-green hover:underline">
                    {translate('forgotPassword')}
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? translate('signingIn') : translate('login')}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {translate('noAccount')}{' '}
              </span>
              <Link to="/sign-up" className="text-mitra-green hover:underline">
                {translate('register')}
              </Link>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/" className="text-sm text-muted-foreground hover:underline">
            &larr; {translate('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
