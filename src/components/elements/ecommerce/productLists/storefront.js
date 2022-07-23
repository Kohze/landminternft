/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
      require('@tailwindcss/aspect-ratio'),
    ],
  }
  ```
*/
import { Fragment, useState } from 'react'

 
const favorites = [
  {
    id: 1,
    name: 'Write to Chain',
    subtitle: 'Post a message to the Bitcoin Blockchain.',
    href: '/write',
    imageSrc: 'https://i.imgur.com/9St7SjG.png',
    imageAlt: "A illustration of how to write to chain.",
  },
  {
    id: 2,
    name: 'Mint a NFT',
    subtitle: 'Token minting made easy.',
    href: '/mint',
    imageSrc: 'https://i.imgur.com/pWaNbzA.png',
    imageAlt: "Mint your own token illustration.",
  },
  {
    id: 3,
    name: 'Break the Network',
    subtitle: 'Send a micro transaction to hundrets of people.',
    href: '/send',
    imageSrc: 'https://i.imgur.com/dKYd5XD.png',
    imageAlt:
      "Micro transactions illustration",
  },
]


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-black">
      <main>
        {/* Favorites section */}
        <section aria-labelledby="favorites-heading">
          <div className="max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-baseline sm:justify-between">
              <h2 id="favorites-heading" className="text-2xl font-bold tracking-tight text-gray-200">
                Try BitcoinSV
              </h2>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-10 sm:grid-cols-3 sm:gap-y-0 sm:gap-x-6 lg:gap-x-8">
              {favorites.map((favorite) => (
                <div key={favorite.id} className="group relative">
                  <div className="w-full h-96 rounded-lg overflow-hidden group-hover:saturate-200 group-hover:brightness-125 sm:h-auto sm:aspect-w-2 sm:aspect-h-3">
                    <img
                      src={favorite.imageSrc}
                      alt={favorite.imageAlt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-gray-200">
                    <a href={favorite.href}>
                      <span className="absolute inset-0" />
                      {favorite.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">{favorite.subtitle}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:hidden">
              <a href="#" className="block text-sm font-semibold text-indigo-600 hover:text-indigo-500">
                Browse all favorites<span aria-hidden="true"> &rarr;</span>
              </a>
            </div>
          </div>
        </section>

  
      </main>

    </div>
  )
}
