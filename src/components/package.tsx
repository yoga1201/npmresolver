type Props = {
  name: string
  description: string
  version: string
  license: string
  homepage: string,
  packages: Packages
}

function Tree({ packages }: { packages: Packages }) {
  return (
    <ul>
      {(packages.map(([content, packages]) => {
        return packages.length !== 0
          ? <li key={content}>{content} <Tree packages={packages} /></li>
          : <li key={content}>{content}</li>
      }))}
    </ul>
  );
}

export default function Package({name, description, version, homepage, license, packages }: Props) {
  return (
    <div className='package'>
      <div className='package__main'>
        <h2 className='package__title'>{`${name}@${version}<${license} License>`}</h2>
        <p className='package__description'>{description}</p>
        {homepage && <a href={homepage} className='package__homepage'>Homepage</a>}
      </div>
      <div className='package__tree'>
        <Tree packages={packages} />
      </div>
    </div>
  )
}

