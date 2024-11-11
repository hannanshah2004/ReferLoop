import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function Component() {
  return (
    <div className="flex flex-col items-center px-4 py-12 md:py-24">
      {/* Hero Section */}
      <div className="container flex flex-col items-center text-center space-y-4 mb-12 md:mb-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter">
          How ReferLoop Works
        </h1>
        <p className="text-xl text-muted-foreground max-w-[600px]">
          ReferLoop connects you with a community of cardholders to share referral bonuses and maximize rewards.
        </p>
      </div>

      {/* Steps Section */}
      <div className="container grid gap-8 md:grid-cols-3 max-w-4xl">
        <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors">
          <CardContent className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-bold text-primary">1</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Sign up for the platform</h3>
            <p className="text-muted-foreground">
              Create your account and join our community of reward-savvy cardholders.
            </p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors">
          <CardContent className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-bold text-primary">2</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Share your referral links</h3>
            <p className="text-muted-foreground">
              Post your credit card referral links and connect with potential applicants.
            </p>
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden border-2 hover:border-primary transition-colors">
          <CardContent className="p-6">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <span className="text-2xl font-bold text-primary">3</span>
            </div>
            <h3 className="text-xl font-bold mb-2">Track your referrals</h3>
            <p className="text-muted-foreground">
              Monitor your referral status and watch your rewards grow over time.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* CTA Section */}
      <div className="container mt-16 md:mt-24 text-center">
        <Button asChild size="lg" className="group">
          <Link href="sign-in">
            Get Started Today
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
      </div>

      {/* Features Section */}
      <div className="container mt-24 max-w-3xl">
        <div className="grid gap-6 text-muted-foreground">
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
            <p>Access a network of verified cardholders and referral opportunities</p>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
            <p>Secure platform with verified users and transparent tracking</p>
          </div>
          <div className="flex items-center gap-4">
            <CheckCircle2 className="h-6 w-6 text-primary flex-shrink-0" />
            <p>Maximize your rewards through community-driven referrals</p>
          </div>
        </div>
      </div>
    </div>
  )
}