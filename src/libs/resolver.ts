import { maxSatisfying } from 'semver'

const resolver = async (
  pkg: string,
  version: string,
  deep: number,
  deepCounter: number = 0
): Promise<Packages> => {
  // if current deep more than expected deep stop to resolver current package
  if(deepCounter > deep) return []

  // fetch
  const req = await fetch('https://registry.npmjs.org/'+pkg)
  if(!req.ok) throw Error('Failed to send request')

  // convert body to json
  const bodyJSON = await req.json()

  // get target version
  const targetVersion = version === 'latest'
    ? bodyJSON['dist-tags'].latest
    : maxSatisfying(Object.keys(bodyJSON.versions), version)

  // fetch
  const rawPackage: Package  = [
    `${pkg}@${targetVersion}`,
    [],
    {
      name: bodyJSON.name,
      license: bodyJSON.license,
      description: bodyJSON.description,
      homepage: bodyJSON?.homepage ?? '',
      version: targetVersion,
    }
  ]

  for (const [dependencyName, dependencyVersion] of Object.entries<string>(
    bodyJSON.versions[targetVersion]?.dependencies ?? {}
  )) {
    // resolver the dependency
    const dependencyNested: Packages = await resolver(
      dependencyName,
      dependencyVersion,
      deep,
      deepCounter + 1
    )

    // push resolver result to package
    rawPackage[1].push(...dependencyNested)
  }

  return [rawPackage]
}

export default resolver
