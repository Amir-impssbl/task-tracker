import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Lock, Mail, UserPlus, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Form validation schema
const authSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      'Password must contain at least one uppercase letter, one lowercase letter, and one number'
    ),
});

type AuthFormData = z.infer<typeof authSchema>;

export function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const { toast } = useToast();
  
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<AuthFormData>({
    resolver: zodResolver(authSchema),
  });

  const onSubmit = async (data: AuthFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      toast({
        title: isLogin ? 'Welcome back!' : 'Account created successfully!',
        description: isLogin
          ? 'You have been logged in.'
          : 'Please check your email to verify your account.',
      });
      
      reset();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-emerald-950">
      <div className="w-full max-w-md p-8 space-y-6 bg-emerald-900/30 backdrop-blur-sm rounded-xl shadow-2xl">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold tracking-tight text-emerald-50">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-emerald-200/60">
            {isLogin
              ? 'Enter your credentials to access your account'
              : 'Sign up for a new account to get started'}
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-emerald-300/50" />
              <Input
                {...register('email')}
                type="email"
                placeholder="Email address"
                className={cn(
                  'pl-10 bg-emerald-900/20 border-emerald-600/30 text-emerald-50 placeholder:text-emerald-300/50',
                  'focus:border-emerald-400 focus:ring-emerald-400/20',
                  errors.email && 'border-red-400/50 focus:border-red-400'
                )}
              />
            </div>
            {errors.email && (
              <p className="text-sm text-red-400">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-emerald-300/50" />
              <Input
                {...register('password')}
                type="password"
                placeholder="Password"
                className={cn(
                  'pl-10 bg-emerald-900/20 border-emerald-600/30 text-emerald-50 placeholder:text-emerald-300/50',
                  'focus:border-emerald-400 focus:ring-emerald-400/20',
                  errors.password && 'border-red-400/50 focus:border-red-400'
                )}
              />
            </div>
            {errors.password && (
              <p className="text-sm text-red-400">{errors.password.message}</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-emerald-50"
          >
            {isSubmitting ? (
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-emerald-50 border-t-transparent" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                {isLogin ? (
                  <LogIn className="h-5 w-5" />
                ) : (
                  <UserPlus className="h-5 w-5" />
                )}
                <span>{isLogin ? 'Log In' : 'Sign Up'}</span>
              </div>
            )}
          </Button>
        </form>

        <div className="text-center">
          <button
            type="button"
            onClick={toggleMode}
            className="text-emerald-300/70 hover:text-emerald-200 text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : 'Already have an account? Log in'}
          </button>
        </div>
      </div>
    </div>
  );
}