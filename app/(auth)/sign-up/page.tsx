import AuthForm from '@/components/AuthForm'

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-600">
      <div className="w-full max-w-md px-4 py-8">
        <AuthForm type="sign-up" />
      </div>
    </div>
  )
}