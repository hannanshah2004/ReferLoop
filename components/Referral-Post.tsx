'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronDown, ChevronUp, ThumbsUp, ThumbsDown, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

interface ReferralPostProps {
  user: {
    name: string
    avatar: string
    trustScore: number
  }
  referral: {
    title: string
    promotion: string
    details: string
    link: string
    code: string
  }
}

export function ReferralPost({ user, referral }: ReferralPostProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLinkClicked, setIsLinkClicked] = useState(false)

  const handleLinkClick = () => {
    setIsLinkClicked(true)
    window.open(referral.link, '_blank')
  }

  const handleFeedback = (isPositive: boolean) => {
    // Here you would typically send this feedback to your backend
    console.log(`User gave ${isPositive ? 'positive' : 'negative'} feedback`)
    setIsLinkClicked(false)
  }

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <Avatar className="h-12 w-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-grow">
            <h3 className="font-semibold">{referral.title}</h3>
            <p className="text-sm text-muted-foreground">{referral.promotion}</p>
            <div className="flex items-center mt-2">
              <Badge variant="secondary" className="mr-2">
                Trust Score: {user.trustScore}
              </Badge>
              <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
                {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                {isExpanded ? 'Less' : 'More'}
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <Button variant="outline" size="icon">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <ThumbsDown className="h-4 w-4" />
            </Button>
          </div>
        </div>
        {isExpanded && (
          <div className="mt-4">
            <p className="mb-2">{referral.details}</p>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleLinkClick}>
                <ExternalLink className="mr-2 h-4 w-4" />
                Referral Link
              </Button>
              <code className="px-2 py-1 bg-muted rounded">{referral.code}</code>
            </div>
          </div>
        )}
      </CardContent>
      <Dialog open={isLinkClicked} onOpenChange={setIsLinkClicked}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Did the referral link work?</DialogTitle>
            <DialogDescription>
              Please let us know if the referral link worked for you. Your feedback helps improve our community.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button variant="outline" onClick={() => handleFeedback(true)}>
              <ThumbsUp className="mr-2 h-4 w-4" />
              Yes, it worked
            </Button>
            <Button variant="outline" onClick={() => handleFeedback(false)}>
              <ThumbsDown className="mr-2 h-4 w-4" />
              No, it didn't work
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}