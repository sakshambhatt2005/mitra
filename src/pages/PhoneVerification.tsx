import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Link } from 'react-router-dom';

const PhoneVerification = () => {
  const { translate } = useLanguage();
  const navigate = useNavigate();
  const { verifyPhone, confirmOTP } = useAuth();
  
  const [isLoading, setIsLoading] = useState(false);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [countdown, setCountdown] = useState(60);
  const [isResending, setIsResending] = useState(false);

  // Handle countdown timer for OTP resend
  useEffect(() => {
    let timer: number;
    
    if (showOTPInput && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(prev => prev - 1);
      }, 1000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, showOTPInput]);

  // Handle phone verification submission
  const handlePhoneSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!phone) {
      toast.error("Please enter your phone number");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await verifyPhone(phone);
      
      if (success) {
        setShowOTPInput(true);
        setCountdown(60);
        toast.success(translate('otpSent'));
      }
    } catch (error) {
      toast.error("Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle OTP verification
  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (otp.length !== 6) {
      toast.error("Please enter the complete 6-digit code");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const success = await confirmOTP(otp);
      
      if (success) {
        toast.success("Phone verified successfully!");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error("OTP verification failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle OTP resend
  const handleResendOTP = async () => {
    if (countdown > 0) return;
    
    setIsResending(true);
    
    try {
      const success = await verifyPhone(phone);
      
      if (success) {
        setCountdown(60);
        toast.success(translate('otpSent'));
      }
    } catch (error) {
      toast.error("Failed to resend verification code");
    } finally {
      setIsResending(false);
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
            <CardTitle className="text-2xl font-heading text-center">
              {showOTPInput ? translate('verifyOTP') : translate('verifyPhone')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {!showOTPInput ? (
              <form onSubmit={handlePhoneSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">{translate('phoneNumber')}</Label>
                  <div className="flex">
                    <span className="flex items-center px-3 bg-muted border border-r-0 border-input rounded-l-md">+91</span>
                    <input
                      id="phone"
                      type="tel"
                      className="flex-1 min-w-0 rounded-none rounded-r-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      placeholder="9876543210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      maxLength={10}
                      required
                    />
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? translate('verifyPhone') + '...' : translate('verifyPhone')}
                </Button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOTP} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="otp">{translate('verificationCode')}</Label>
                  <p className="text-sm text-muted-foreground">{translate('verifyPhoneDescription')}</p>
                  
                  <div className="flex justify-center py-4">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                
                <Button type="submit" className="w-full" disabled={isLoading || otp.length !== 6}>
                  {isLoading ? translate('verifyOTP') + '...' : translate('verifyOTP')}
                </Button>
                
                <div className="mt-4 text-center">
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || isResending}
                    className="text-sm text-mitra-green hover:underline disabled:opacity-50 disabled:no-underline"
                  >
                    {countdown > 0
                      ? `${translate('resendOTP')} (${countdown}s)`
                      : translate('resendOTP')}
                  </button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>

        <div className="text-center mt-6">
          <Link to="/sign-up" className="text-sm text-muted-foreground hover:underline">
            &larr; {translate('backToHome')}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PhoneVerification;
