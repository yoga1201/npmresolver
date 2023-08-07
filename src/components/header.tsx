import { useEffect, useRef } from 'react'
import NyanCatURL from '../nyan-cat.gif'

export default function Header() {
  const headingClickCounter = useRef(0)
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current!.addEventListener('click', () => {
      
      if (headingClickCounter.current >= 10)
        window.open(NyanCatURL, 'nyan cat for you:D', 'width=500,height=400')
      else
        headingClickCounter.current++
    })
  })

  return (
    <header className='header'>
      <h1 className='header__title' ref={headingRef}>NPM-Resolver🐚</h1>
      <p className='header__paragraph'>A simple package resolver</p>
    </header>
  )
}
