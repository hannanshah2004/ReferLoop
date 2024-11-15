import Camp from "@/components/Camp";
import Features from "@/components/Features";
import GetApp from "@/components/GetApp";
import Guide from "@/components/Guide";
import Hero from "@/components/Hero";
import { getLoggedInUser } from '@/lib/actions/user.actions';

const Home = async()=> {
  
  // const loggedIn = await getLoggedInUser();

  // if(!loggedIn) return;


  return (
    <>
      <Hero />
      <Camp />
      <Guide />
      <Features />
      <GetApp />
    </>
  )
}

export default Home