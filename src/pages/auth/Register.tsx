import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Loader2, Mail, Lock, User, AtSign, ArrowLeft, Github, Linkedin } from 'lucide-react';
import { toast } from 'sonner';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('كلمتا المرور غير متطابقتين');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('يجب أن تكون كلمة المرور 6 أحرف على الأقل');
      return;
    }
    
    const result = await register({
      username: formData.username,
      name: formData.name,
      email: formData.email,
      password: formData.password
    });

    if (result.status === 'complete') {
      toast.success('تم إنشاء الحساب بنجاح!');
      navigate('/dashboard');
    } else if (result.status === 'needs_verification') {
      toast.info('يرجى التحقق من بريدك الإلكتروني لتأكيد الحساب');
    } else {
      toast.error(result.error || 'فشل في إنشاء الحساب');
    }
  };

  const handleSocialLogin = async (provider: 'oauth_google' | 'oauth_github' | 'oauth_facebook' | 'oauth_linkedin_oidc') => {
    try {
      const { loginWithProvider } = useAuth();
      await loginWithProvider(provider);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'فشل التسجيل');
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
            انضم إلينا
          </h1>
          <p className="text-muted-foreground mt-2">
            أنشئ حسابك وابدأ بناء بورتفوليوك المميز
          </p>
        </div>

        <Card className="glass shadow-2xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl">إنشاء حساب جديد</CardTitle>
            <CardDescription>
              اختر طريقة إنشاء الحساب المفضلة لديك
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
                <span className="font-medium">التسجيل مع Gmail</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                onClick={() => handleSocialLogin('oauth_github')}
              >
                <Github className="h-5 w-5 mr-3" />
                <span className="font-medium">التسجيل مع GitHub</span>
              </Button>
              
              <Button 
                type="button" 
                variant="outline" 
                className="w-full h-12 hover-lift transition-all duration-300" 
                onClick={() => handleSocialLogin('oauth_linkedin_oidc')}
              >
                <Linkedin className="h-5 w-5 mr-3 text-blue-600" />
                <span className="font-medium">التسجيل مع LinkedIn</span>
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
                <span className="font-medium">التسجيل مع Facebook</span>
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
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <div className="relative">
                    <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      name="username"
                      type="text"
                      placeholder="johndoe"
                      value={formData.username}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="name">الاسم الكامل</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="أحمد محمد"
                      value={formData.name}
                      onChange={handleChange}
                      className="pl-10 h-12"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
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
                    name="password"
                    type="password"
                    placeholder="6 أحرف على الأقل"
                    value={formData.password}
                    onChange={handleChange}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">تأكيد كلمة المرور</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    placeholder="أعد كتابة كلمة المرور"
                    value={formData.confirmPassword}
                    onChange={handleChange}
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
                    جاري إنشاء الحساب...
                  </>
                ) : (
                  'إنشاء الحساب'
                )}
              </Button>
            </form>

            <div className="text-center text-sm">
              <span className="text-muted-foreground">لديك حساب بالفعل؟ </span>
              <Link 
                to="/login" 
                className="text-primary hover:underline font-medium"
              >
                تسجيل الدخول
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;