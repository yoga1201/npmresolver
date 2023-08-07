type Packages = [string, Packages, {
  name: string,
  license: string,
  description: string,
  version: string,
  homepage: string,
}][]

type Package = [string, Packages, {
  name: string,
  license: string,
  description: string,
  version: string,
  homepage: string,
}]

