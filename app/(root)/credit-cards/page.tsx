'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Search, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import referralPostsData from './referral_posts.json'
import creditCardsData from './creditcards.json'

interface Post {
  id: string
  creditCard: string
  comment: string
  date: string
  category: string
  annualFee: string
  foreignTransactionFees: string
  cardType: string
  cardCategory: string
}

interface Filters {
  category: string
  annualFee: string
  foreignTransactionFees: string
  cardType: string
  cardCategory: string
}

export default function ReferralFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())
  const [filters, setFilters] = useState<Filters>({
    category: '',
    annualFee: '',
    foreignTransactionFees: '',
    cardType: '',
    cardCategory: '',
  })

  const { businessCards, noForeignTransactionFeesCards, creditCards, chargeCards, cashBackCards, milesCards, pointsCards } = creditCardsData

  useEffect(() => {
    const formattedPosts = referralPostsData.flatMap((post: any, index: number) => {
      if (post.comments.length === 0) return []

      const category = businessCards.some(card => post.creditCard.includes(card)) ? 'Business' : 'Personal'
      const annualFee = post.annualFee === 0 || post.annualFee === '0' ? "$0" : "Annual Fee"
      const foreignTransactionFees = noForeignTransactionFeesCards.some(card => post.creditCard.includes(card)) ? 'No' : 'Yes'
      const cardType = creditCards.some(card => post.creditCard.includes(card)) ? 'Credit Card' : 'Charge Card'
      let cardCategory = ''
      if (cashBackCards.some(card => post.creditCard.includes(card))) {
        cardCategory = 'Cash Back'
      } else if (milesCards.some(card => post.creditCard.includes(card))) {
        cardCategory = 'Miles'
      } else if (pointsCards.some(card => post.creditCard.includes(card))) {
        cardCategory = 'Points'
      }

      return post.comments.map((comment: string, commentIndex: number) => ({
        id: `${post.creditCard}-${commentIndex}-${index}`,
        creditCard: post.creditCard,
        comment: comment,
        date: post.Date,
        category,
        annualFee,
        foreignTransactionFees,
        cardType,
        cardCategory,
      }))
    })
    setPosts(formattedPosts)
  }, [businessCards, noForeignTransactionFeesCards, creditCards, chargeCards, cashBackCards, milesCards, pointsCards])

  const filteredPosts = posts.filter(post => {
    return (
      post.creditCard.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filters.category ? post.category === filters.category : true) &&
      (filters.annualFee ? post.annualFee === filters.annualFee : true) &&
      (filters.foreignTransactionFees ? post.foreignTransactionFees === filters.foreignTransactionFees : true) &&
      (filters.cardType ? post.cardType === filters.cardType : true) &&
      (filters.cardCategory ? post.cardCategory === filters.cardCategory : true)
    )
  })

  const toggleExpand = (id: string) => {
    setExpandedPosts(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const formatReferralLink = (link: string) => {
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`
    }
    return link
  }

  const handleFilterChange = (value: string, filterName: keyof Filters) => {
    setFilters(prev => ({
      ...prev,
      [filterName]: value,
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Referral Feed</h1>

      <div className="mb-6 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        {/* Top Row of Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-4">
          <Button
            variant={filters.category === 'Business' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.category === 'Business' ? '' : 'Business', 'category')}
            className="w-[200px]"
          >
            Business
          </Button>
          <Button
            variant={filters.category === 'Personal' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.category === 'Personal' ? '' : 'Personal', 'category')}
            className="w-[200px]"
          >
            Personal
          </Button>
          <Button
            variant={filters.annualFee === '$0' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.annualFee === '$0' ? '' : '$0', 'annualFee')}
            className="w-[200px]"
          >
            $0 Annual Fee
          </Button>
          <Button
            variant={filters.annualFee === 'Annual Fee' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.annualFee === 'Annual Fee' ? '' : 'Annual Fee', 'annualFee')}
            className="w-[200px]"
          >
            Annual Fee
          </Button>
        </div>

        {/* Bottom Row of Filters */}
        <div className="flex justify-center flex-wrap gap-4 mb-4">
          <Button
            variant={filters.foreignTransactionFees === 'No' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.foreignTransactionFees === 'No' ? '' : 'No', 'foreignTransactionFees')}
            className="w-[200px]"
          >
            No Foreign Transaction Fees
          </Button>
          <Button
            variant={filters.cardCategory === 'Cash Back' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.cardCategory === 'Cash Back' ? '' : 'Cash Back', 'cardCategory')}
            className="w-[200px]"
          >
            Cash Back
          </Button>
          <Button
            variant={filters.cardCategory === 'Miles' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.cardCategory === 'Miles' ? '' : 'Miles', 'cardCategory')}
            className="w-[200px]"
          >
            Miles
          </Button>
          <Button
            variant={filters.cardCategory === 'Points' ? 'solid' : 'outline'}
            onClick={() => handleFilterChange(filters.cardCategory === 'Points' ? '' : 'Points', 'cardCategory')}
            className="w-[200px]"
          >
            Points
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto space-y-6">
        {filteredPosts.map((post) => (
          <Card key={post.id} className="w-full overflow-hidden bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/30 border-orange-200 dark:border-orange-800">
            <CardHeader className="pb-0">
              <CardTitle className="flex justify-between items-center">
                <span>{post.creditCard}</span>
                <span className="text-sm font-normal text-muted-foreground">{post.date}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-1/3 relative aspect-[1.586/1]">
                  <Image
                    src="/amex.jpeg"
                    alt={`${post.creditCard} card`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg shadow-md"
                  />
                </div>
                <div className="w-2/3">
                  <Button
                    variant="outline"
                    className="w-full justify-between bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 hover:from-red-600 hover:via-orange-600 hover:to-yellow-600 text-white border-none shadow-md hover:shadow-lg transition-all duration-200"
                    onClick={() => toggleExpand(post.id)}
                  >
                    {expandedPosts.has(post.id) ? 'Hide Referral Link' : 'Show Referral Link'}
                    {expandedPosts.has(post.id) ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />}
                  </Button>
                </div>
              </div>
              {expandedPosts.has(post.id) && (
                <div className="mt-4 p-4 bg-white/50 dark:bg-gray-800/50 rounded-md shadow-inner">
                  <a
                    href={formatReferralLink(post.comment)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-700 dark:text-orange-300 hover:underline flex items-center"
                  >
                    {post.comment}
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {filteredPosts.length === 0 && (
          <p className="text-center text-muted-foreground">No matching cards found.</p>
        )}
      </div>
    </div>
  )
}
