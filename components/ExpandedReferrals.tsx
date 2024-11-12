'use client'

import { useState } from 'react'
import { ChevronDown, ChevronUp, CreditCard, DollarSign } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'

interface ReferralData {
  id: string
  cardName: string
  usedLinks: number
  reward: number
}

interface ExpandableReferralCardsProps {
  referralData: ReferralData[]
}

export function ExpandableReferralCards({ referralData }: ExpandableReferralCardsProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  const toggleCard = (cardId: string) => {
    setExpandedCard(expandedCard === cardId ? null : cardId)
  }

  return (
    <div className="space-y-4">
      {referralData.map((card) => (
        <Card key={card.id} className="overflow-hidden">
          <Button
            variant="ghost"
            className="w-full justify-between p-6"
            onClick={() => toggleCard(card.id)}
          >
            <span className="font-semibold">{card.cardName}</span>
            {expandedCard === card.id ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
          {expandedCard === card.id && (
            <CardContent className="pt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center space-x-2">
                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                  <span>Used Links: {card.usedLinks}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>Reward per Referral: ${card.reward}</span>
                </div>
              </div>
              <Button className="mt-4 w-full" variant="outline">
                Copy Referral Link
              </Button>
            </CardContent>
          )}
        </Card>
      ))}
    </div>
  )
}