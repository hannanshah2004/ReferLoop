'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,  // Make sure this import exists
} from '@/components/ui/card' // Correct import path
import { getLoggedInUser, signUp, signIn } from '@/lib/actions/user.actions'
import Image from 'next/image'

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters' }),
})

export default function AuthForm({ type = 'sign-in' }: { type?: 'sign-in' | 'sign-up' }) {
  const router = useRouter()
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    try {
      if(type === 'sign-up') {
        const userData = {
          email: data.email,
          password: data.password
        }
        const newUser = await signUp(userData);
        setUser(newUser);
        router.push('/')
      }
      if(type === 'sign-in') {
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        if(response) router.push('/')
      }
    } catch (error) {
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg">
      <CardHeader className="space-y-1 bg-white">
        {/* Add ReferLoop logo here */}
        <Link href="/">
          <Image src="/ReferLoop.jpg" alt="ReferLoop logo" width={150} height={50} className="mx-auto mb-4 cursor-pointer" />
        </Link>
        <CardDescription className="text-center text-gray-600">
          Connect, Share, and Earn Rewards
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 bg-white">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your email" className="bg-white text-gray-900" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" className="bg-white text-gray-900" {...field} />
                  </FormControl>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                type === 'sign-in' ? 'Sign In' : 'Sign Up'
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4 bg-white">
        <div className="text-sm text-center bg-white">
          Join our community of cardholders and maximize your rewards through referrals.
        </div>
        <div className="text-sm text-center text-gray-700">
          {type === 'sign-in' ? (
            <>
              Don't have an account?{' '}
              <Link href="/sign-up" className="font-medium text-blue-600 hover:underline">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{' '}
              <Link href="/sign-in" className="font-medium text-blue-600 hover:underline">
                Sign in
              </Link>
            </>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}
