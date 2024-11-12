import { DollarSign, Users, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ExpandableReferralCards } from '@/components/ExpandedRefferals'

export default function YourRewards() {
  const referralData = [
    { id: '1', cardName: 'Chase Sapphire Preferred', usedLinks: 5, reward: 150 },
    { id: '2', cardName: 'American Express Gold Card', usedLinks: 3, reward: 100 },
    { id: '3', cardName: 'Capital One Venture', usedLinks: 2, reward: 75 },
  ]

  return (
    <div className="flex flex-col items-center px-4 py-12 md:py-24">
      <div className="container max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8">Your Rewards</h1>
        
        <div className="grid gap-6 md:grid-cols-3 mb-12">
          <Card className="bg-gradient-to-br from-purple-500 to-pink-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Earnings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center">
                <DollarSign className="h-6 w-6 mr-1" />
                825
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Total Referrals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center">
                <Users className="h-6 w-6 mr-1" />
                10
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium">Trust Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold flex items-center mb-2">
                <Star className="h-6 w-6 mr-1" />
                4.8
              </div>
              <Progress value={96} className="h-2 bg-white/20" />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Links</CardTitle>
            <CardDescription>Click to expand and see details for each card</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpandableReferralCards referralData={referralData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}