'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { ReferralPost } from '@/components/Referral-Post'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import seedrandom from 'seedrandom' // Import seedrandom library

// Define the types for the data
interface User {
  name: string;
  avatar: string;
  trustScore: number;
}

interface Referral {
  title: string;
  promotion: string;
  details: string;
  link: string;
  code: string;
  image: string;
}

interface Post {
  id: number;
  user: User;
  referral: Referral;
}

// Mock data generator with a fixed seed
const generateMockData = (start: number, end: number, seed: string): Post[] => {
  const rng = seedrandom(seed); // Initialize RNG with the fixed seed
  const cardTypes = ['Travel', 'Cashback', 'Rewards', 'Business', 'Student'];
  
  return Array.from({ length: end - start }, (_, i) => ({
    id: start + i,
    user: {
      name: `User ${start + i}`,
      avatar: `/placeholder.svg?height=40&width=40`,
      trustScore: Math.floor(rng() * 5) + 1, // Use RNG to generate consistent values
    },
    referral: {
      title: `${cardTypes[Math.floor(rng() * cardTypes.length)]} Card ${start + i}`,
      promotion: `Get $${(Math.floor(rng() * 10) + 1) * 100} bonus`,
      details: `Apply now and spend $3000 in the first 3 months to get this amazing bonus!`,
      link: `https://example.com/referral/${start + i}`,
      code: `REF${start + i}`,
      image: `/placeholder.svg?height=50&width=80&text=Card+${start + i}`,
    },
  }));
}

export default function ReferralFeed() {
  // Initialize the state with the correct type
  const [posts, setPosts] = useState<Post[]>([]) // Now it's an array of `Post` objects
  const [loading, setLoading] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const observer = useRef<IntersectionObserver | null>(null)

  // Define a static seed (ensure it's consistent for SSR and CSR)
  const seed = 'my-fixed-seed' // You can change this seed to something dynamic, if needed

  // Fetch the initial posts using the fixed seed
  useEffect(() => {
    const initialPosts = generateMockData(0, 10, seed) // Pass seed to generate consistent posts
    setPosts(initialPosts)
  }, [seed])

  const lastPostElementRef = useCallback((node: HTMLDivElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setLoading(true)
        // Simulate API call
        setTimeout(() => {
          setPosts(prevPosts => [
            ...prevPosts,
            ...generateMockData(prevPosts.length, prevPosts.length + 10, seed),
          ])
          setLoading(false)
        }, 1000)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, seed])

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
