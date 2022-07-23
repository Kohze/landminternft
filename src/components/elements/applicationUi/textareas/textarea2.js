/* This example requires Tailwind CSS v2.0+ */

import PropTypes from 'prop-types'

export default function Example({ rows }) {
  return (
    <div className="shadow overflow-hidden sm:rounded-xl w-full">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-white">
          Land Ownership Certificate
        </h3>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          Mera County Land Deed.
        </p>
      </div>
      <div className="border-t border-gray-700 px-4 py-5 sm:p-0">
        <dl className="sm:divide-y sm:divide-gray-700">
          {rows.map(({ key, value }) => (
            <div
              className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 "
              key={key}
            >
              <dt className="text-sm font-medium text-orange-300">{key}</dt>
              <dd className="mt-1 text-sm text-gray-300 sm:mt-0 sm:col-span-2">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

Example.propTypes = {
  rows: PropTypes.array,
}
