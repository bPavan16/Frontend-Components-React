'use client';

import { ApiResponse } from '@/types/ApiResponse';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from 'usehooks-ts';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import axios, { AxiosError } from 'axios';
import { Loader2, MessageSquare, CheckCircle2, AlertCircle, Mail, User, Lock } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { signUpSchema } from '@/schemas/signUpSchema';

export default function SignUpForm() {
  const [username, setUsername] = useState('');
  const [usernameMessage, setUsernameMessage] = useState('');
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const debouncedUsername = useDebounce(username, 300);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    const checkUsernameUnique = async () => {
      if (debouncedUsername) {
        setIsCheckingUsername(true);
        setUsernameMessage(''); // Reset message
        try {
          const response = await axios.get<ApiResponse>(
            `/api/check-username-unique?username=${debouncedUsername}`
          );
          setUsernameMessage(response.data.message);
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>;
          setUsernameMessage(
            axiosError.response?.data.message ?? 'Error checking username'
          );
        } finally {
          setIsCheckingUsername(false);
        }
      }
    };
    checkUsernameUnique();
  }, [debouncedUsername]);

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post<ApiResponse>('/api/sign-up', data);

      toast({
        title: 'Success',
        description: response.data.message,
      });

      router.replace(`/sign-in`);

      setIsSubmitting(false);
    } catch (error) {
      console.error('Error during sign-up:', error);

      const axiosError = error as AxiosError<ApiResponse>;

      // Default error message
      let errorMessage = axiosError.response?.data.message ||
        'There was a problem with your sign-up. Please try again.';

      toast({
        title: 'Sign Up Failed',
        description: errorMessage,
        variant: 'destructive',
      });

      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/noise.svg')] opacity-5"></div>
        <div className="absolute top-24 left-0 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-36 right-0 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-24 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="w-full max-w-md relative">
        <div className="bg-white/95 backdrop-blur-lg border border-gray-200 rounded-2xl shadow-xl overflow-hidden">
          {/* Header with gradient */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 flex items-center justify-center">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <MessageSquare className="h-8 w-8 text-white" />
            </div>
          </div>
          
          <div className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                Create Your Account
              </h1>
              <p className="text-gray-600 mt-2">Get started with anonymous feedback</p>
            </div>
            
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  name="username"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Username</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                              <User className="h-4 w-4" />
                            </div>
                            <Input
                              {...field}
                              className="pl-10 pr-8 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                              onChange={(e) => {
                                field.onChange(e);
                                setUsername(e.target.value);
                              }}
                            />
                            <div className="absolute inset-y-0 right-2 flex items-center">
                              {isCheckingUsername && (
                                <Loader2 className="h-4 w-4 text-gray-400 animate-spin" />
                              )}
                              {!isCheckingUsername && usernameMessage === 'Username is unique' && (
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                              )}
                              {!isCheckingUsername && usernameMessage && usernameMessage !== 'Username is unique' && (
                                <AlertCircle className="h-4 w-4 text-red-500" />
                              )}
                            </div>
                          </div>
                        </FormControl>
                      </div>
                      {!isCheckingUsername && usernameMessage && (
                        <p
                          className={`text-sm mt-1 flex items-center ${usernameMessage === 'Username is unique'
                            ? 'text-green-600'
                            : 'text-red-500'
                            }`}
                        >
                          {usernameMessage === 'Username is unique' ? (
                            <CheckCircle2 className="inline h-3 w-3 mr-1" />
                          ) : (
                            <AlertCircle className="inline h-3 w-3 mr-1" />
                          )}
                          {usernameMessage}
                        </p>
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  name="email"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Email</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          <Mail className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input 
                            {...field} 
                            name="email" 
                            className="pl-10 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                          />
                        </FormControl>
                      </div>
                      <p className='text-xs text-gray-500 mt-1'>We'll send a verification code to this email</p>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  name="password"
                  control={form.control}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Password</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-500">
                          <Lock className="h-4 w-4" />
                        </div>
                        <FormControl>
                          <Input 
                            type="password" 
                            {...field} 
                            name="password" 
                            className="pl-10 bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-all"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating account...
                    </div>
                  ) : (
                    'Sign Up'
                  )}
                </Button>
              </form>
            </Form>
            
            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link href="/sign-in" className="text-blue-600 hover:text-blue-800 font-medium">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
