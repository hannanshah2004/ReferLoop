'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Search, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react'
import referralPostsData from './referral_posts.json'

interface Post {
  id: string;
  creditCard: string;
  comment: string;
  date: string;
}

export default function ReferralFeed() {
  const [posts, setPosts] = useState<Post[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedPosts, setExpandedPosts] = useState<Set<string>>(new Set())

  useEffect(() => {
    const formattedPosts = referralPostsData.flatMap((post: any, index: number) => {
      if (post.comments.length === 0) return [];
      return post.comments.map((comment: string, commentIndex: number) => ({
        id: `${post.creditCard}-${commentIndex}-${index}`,
        creditCard: post.creditCard,
        comment: comment,
        date: post.Date,
      }));
    });
    setPosts(formattedPosts);
  }, [])

  const filteredPosts = posts.filter(post =>
    post.creditCard.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Ensure the link is absolute by checking if it's properly formatted
  const formatReferralLink = (link: string) => {
    // Ensure the link starts with "http://" or "https://"
    if (!link.startsWith("http://") && !link.startsWith("https://")) {
      return `https://${link}`; // Prepend "https://" if missing
    }
    return link; // Return as is if already correct
  };

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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Referral Feed</h1>
      <div className="sticky top-0 bg-background z-10 py-4 mb-6">
        <div className="relative max-w-md mx-auto">
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
                    href={formatReferralLink(post.comment)} // Use the formatted referral link
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
