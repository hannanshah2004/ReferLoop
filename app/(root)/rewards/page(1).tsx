'use client'

import { useEffect, useState } from 'react'
import { DollarSign, Users, Star } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ExpandableReferralCards } from '@/components/ExpandedReferrals'
import { useUser } from '@/components/UserProvider'
import { useRouter } from 'next/navigation'
import { getLoggedInUser, getUserInfo } from '@/lib/actions/user.actions'

interface UserRewards {
  totalEarnings: number
  totalReferrals: number
  trustScore: number
  referralData: Array<{
    id: string
    cardName: string
    usedLinks: number
    reward: number
  }>
}

export default function YourRewards() {
  const { user } = useUser()
  const router = useRouter()
  const [userRewards, setUserRewards] = useState<UserRewards | null>(null)

  useEffect(() => {
    if (!user) {
      router.push('/')
    } else {
      // Fetch user rewards data
      // This is a mock fetch, replace with actual API call
      const fetchUserRewards = async () => {
        // Simulating API call
        const userId = user.userId
        const userData = await getUserInfo({userId})
        setUserRewards({
          totalEarnings: userData.earnings,
          totalReferrals: userData.referrals,
          trustScore: userData.trustScore,
          referralData: [
            { id: '1', cardName: 'Chase Sapphire Preferred', usedLinks: 5, reward: 150 },
            { id: '2', cardName: 'American Express Gold Card', usedLinks: 3, reward: 100 },
            { id: '3', cardName: 'Capital One Venture', usedLinks: 2, reward: 75 },
          ]
        })
      }
      fetchUserRewards()
    }
  }, [user, router])

  if (!user || !userRewards) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>
  }

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
                {userRewards.totalEarnings}
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
                {userRewards.totalReferrals}
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
                {userRewards.trustScore}
              </div>
              <Progress value={userRewards.trustScore * 1000} className="h-2 bg-white/20" />
            </CardContent>
          </Card>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Your Referral Links</CardTitle>
            <CardDescription>Click to expand and see details for each card</CardDescription>
          </CardHeader>
          <CardContent>
            <ExpandableReferralCards referralData={userRewards.referralData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}