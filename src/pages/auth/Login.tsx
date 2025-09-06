import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, Lock, ArrowLeft, Github, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = await login(email, password);
    
    if (result.status === 'complete') {
      toast.success('مرحباً بعودتك!');
      navigate(from, { replace: true });
    } else if (result.status === 'needs_verification') {
      toast.info('يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب');
    } else {
      toast.error(result.error || 'فشل تسجيل الدخول');
    }
  };

  const handleSocialLogin = async (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook' | 'oauth_linkedin_oidc') => {
    try {
      const { loginWithProvider } = useAuth();
      await loginWithProvider(provider);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'فشل تسجيل الدخول');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-background via-background to-secondary/20">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <Button
            variant="ghost"
            size="sm"
            className="mb-4 hover-lift"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            العودة للرئيسية
          </Button>
          
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white text-2xl font-bold">
              VP
            </div>
          </div>
          
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            أهلاً بعودتك
          </h1>
          <p className="text-muted-foreground mt-2">
            سجل دخولك للوصول إلى بورتفوليوك
          </p>
        </div>

        <Card className="glass shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">تسجيل الدخول</CardTitle>
            <CardDescription>
              اختر طريقة تسجيل الدخول المفضلة لديك
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Social Login Buttons */}
            <div className="space-y-3">
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                onClick={() => handleSocialLogin('oauth_google')}
              >
                <Mail className="h-5 w-5 mr-3 text-red-500" />
                <span className="font-medium">متابعة مع Gmail</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                onClick={() => handleSocialLogin('oauth_github')}
              >
                <Github className="h-5 w-5 mr-3" />
                <span className="font-medium">متابعة مع GitHub</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                onClick={() => handleSocialLogin('oauth_linkedin_oidc')}
              >
                <Linkedin className="h-5 w-5 mr-3 text-blue-600" />
                <span className="font-medium">متابعة مع LinkedIn</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                onClick={() => handleSocialLogin('oauth_facebook')}
              >
                <div className="w-5 h-5 mr-3 bg-blue-600 rounded text-white flex items-center justify-center text-sm font-bold">
                  f
                </div>
                <span className="font-medium">متابعة مع Facebook</span>
              </Button>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">أو</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="أدخل كلمة المرور"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    جاري تسجيل الدخول...
                  </>
                ) : (
                  'تسجيل الدخول'
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">ليس لديك حساب؟ </span>
              <Link 
                to="/register" 
                className="text-primary hover:underline font-medium"
              >
                إنشاء حساب جديد
              </Link>
            </div>

            <div className="p-4 bg-muted/50 rounded-lg border text-sm text-muted-foreground">
              <p className="font-medium mb-2 text-center">🎯 للتجربة، استخدم:</p>
              <p className="text-center">
                <strong>البريد:</strong> john@example.com أو sarah@example.com<br />
                <strong>كلمة المرور:</strong> password123
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;