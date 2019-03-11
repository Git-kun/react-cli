import * as React from 'react'
import * as Loadable from 'react-loadable';
import classnames from 'classnames'

export function Loading( { error } ) {
  if ( error ) {
    console.log( error )
    return (
      <div>
        <h1>Error!</h1>
        <div>{error}</div>
      </div>
    )
  } else {
    return <div>Loading...</div>
  }
}

// loader: () => Promise.resolve(() => <Loading/>),

export const LazyLoadingComponent = ( ipt ) => Loadable( {
  loader: ipt,
  loading: Loading,
} );