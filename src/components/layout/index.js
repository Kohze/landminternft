import React from 'react'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="flex flex-col flex-1 bg-black">{children}</div>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
