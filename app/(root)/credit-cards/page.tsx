'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { ReferralPost } from '@/components/Referral-Post'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

// Mock data generator
const generateMockData = (start: number, end: number) => {
  const cardTypes = ['Travel', 'Cashback', 'Rewards', 'Business', 'Student']
  return Array.from({ length: end - start }, (_, i) => ({
    id: start + i,
    user: {
      name: `User ${start + i}`,
      avatar: `/placeholder.svg?height=40&width=40`,
      trustScore: Math.floor(Math.random() * 5) + 1,
    },
    referral: {
      title: `${cardTypes[Math.floor(Math.random() * cardTypes.length)]} Card ${start + i}`,
      promotion: `Get $${(Math.floor(Math.random() * 10) + 1) * 100} bonus`,
      details: `Apply now and spend $3000 in the first 3 months to get this amazing bonus!`,
      link: `https://example.com/referral/${start + i}`,
      code: `REF${start + i}`,
      image: `/placeholder.svg?height=50&width=80&text=Card+${start + i}`,
    },
  }))
}

export default function ReferralFeed() {
  const [posts, setPosts] = useState(generateMockData(0, 10))
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const observer = useRef<IntersectionObserver | null>(null)

  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
          setPosts(prevPosts => [...prevPosts, ...generateMockData(prevPosts.length, prevPosts.length + 10)])
          setLoading(false)
        }, 1000)
      }
    })
    if (node) observer.current.observe(node)
  }, [loading])

  const filteredPosts = posts.filter(post =>
    post.referral.title.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Referral Feed</h1>
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
      <div className="w-full">
        {filteredPosts.map((post, index) => (
          <div 
            key={post.id} 
            ref={index === filteredPosts.length - 1 ? lastPostElementRef : null}
          >
            <ReferralPost user={post.user} referral={post.referral} />
          </div>
        ))}
        {loading && <p className="text-center">Loading more posts...</p>}
        {filteredPosts.length === 0 && !loading && (
          <p className="text-center text-muted-foreground">No matching cards found.</p>
        )}
      </div>
    </div>
  )
}