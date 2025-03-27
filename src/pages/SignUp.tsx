import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const SignUp = () => {
  const { translate } = useLanguage();
  const { register, verifyPhone } = useAuth();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    if (
      !formData.firstName || 
      !formData.lastName || 
      !formData.phoneNumber
    ) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // Validate phone number format (basic validation)
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(formData.phoneNumber)) {
      toast.error('Please enter a valid 10-digit phone number');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Register the user first
      const success = await register({
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phoneNumber,
        email: '', // We'll keep this empty since we're not using email
        password: '' // We'll keep this empty since we're not using password
      });
      
      if (success) {
        // If registration is successful, send OTP
        const otpSent = await verifyPhone(formData.phoneNumber);
        if (otpSent) {
          toast.success('OTP sent to your phone');
          navigate('/verify-phone');
        } else {
          toast.error('Failed to send OTP. Please try again.');
        }
      } else {
        toast.error('Registration failed. Please try again.');
      }
    } catch (error) {
      toast.error('An error occurred during registration');
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
            <CardTitle className="text-2xl font-heading text-center">{translate('register')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">{translate('firstName')}</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">{translate('lastName')}</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">{translate('phoneNumber')}</Label>
                <Input
                  id="phoneNumber"
                  placeholder="1234567890"
                  type="tel"
                  pattern="[0-9]{10}"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? translate('creating') : translate('register')}
              </Button>
            </form>
            
            <div className="mt-6 text-center text-sm">
              <span className="text-muted-foreground">
                {translate('alreadyHaveAccount')}{' '}
              </span>
              <Link to="/sign-in" className="text-mitra-green hover:underline">
                {translate('login')}
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

export default SignUp;
