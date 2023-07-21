import React  from 'react'
import Hero from '../components/Hero';
import Albums from '../components/Albums';
import Post from '../components/Post';
function Home() {
  return (<>
    <section>
      <Hero/>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <Albums/>
      <hr className="w-48 h-1 mx-auto my-4 bg-gray-100 border-0 rounded md:my-10 dark:bg-gray-700"/>
      <Post/>
  </section>
  </>
  )
}

export default Home