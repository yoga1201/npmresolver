import { useEffect, useRef, useState } from 'react'
import Package from './package'
import resolver from '../libs/resolver'
import Input from './input'

const packageRegexp = /((?:@(?:[a-z0-9-*~][a-z0-9-*._~]*)?\/)?[a-z0-9-~][a-z0-9-._~]*)@(.+?)$/
const intRegexp = /^\d+$/
export default function Main() {
  const packages = useRef<Packages>([])
  const inputPackageNameRef = useRef<HTMLInputElement>(null)
  const inputDeepLevelRef = useRef<HTMLInputElement>(null)
  const buttonResolveRef = useRef<HTMLButtonElement>(null)
  const [isChanged, setIsChanged] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    buttonResolveRef.current!.addEventListener('click', () => {
      // if input not integer stop
      if (!intRegexp.test(inputDeepLevelRef.current!.value)) {
        setError('Deep level is invalid, deep level must be integer.')
        return
      }

      const deepLevel = parseInt(inputDeepLevelRef.current!.value)

      // if input out from range
      if (deepLevel < 0 || deepLevel > 10) {
        setError('Invalid deep level, minimum allowed value is 0 and maximum allowed value is 10')
        return
      }

      const packageInputValue = inputPackageNameRef.current!.value

      // if package format is not valid
      if (!packageRegexp.test(packageInputValue)) {
        setError('Package format is not valid')
        return
      }

      // destruct
      const [, name, version] = packageInputValue.match(packageRegexp)!
      buttonResolveRef.current!.innerHTML = 'Please wait🔃'
      buttonResolveRef.current!.disabled = true

      // resolve
      resolver(
        name, version,
        deepLevel
      ).then((result) => {
        // set dependencies result
        packages.current = []
        packages.current = result

        // set button to normal
        buttonResolveRef.current!.innerHTML = 'Resolve🔍'
        buttonResolveRef.current!.disabled = false

        setIsChanged(!isChanged)
      })
    })
  }, [])

  return (
    <main className='main'>
      <Input
        id='input-package'
        placeholder='name@version'
        ref={inputPackageNameRef}
        type='text'
      >Something you want to <em>'Track'</em></Input>
      <Input
        id='input-deep-level'
        placeholder='number'
        ref={inputDeepLevelRef}
        type='number'
        inputProperty={{
          max: '10',
          min: '1',
          defaultValue: '10',
        }}
      >Limit deep</Input>
      <button ref={buttonResolveRef}>Resolve🔍</button>
      <span className='main__error'>{error}</span>

      {
        packages.current.length !== 0
          ? <Package
              name={packages.current![0][2].name}
              description={packages.current![0][2].description}
              version={packages.current![0][2].version}
              license={packages.current![0][2].license}
              homepage={packages.current![0][2].homepage}
              packages={packages.current}
            />
          : ''
      }
    </main>
  )
}
