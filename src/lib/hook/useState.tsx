/**
 * @author: hukun
 * @Date: 2019-05-17
 * @Time: 10:09
 * @function
 */

import * as React from 'react';

export function useCoustomState<T> ( initState: T ) {
  const [ state, setState ] = React.useState<T>( initState );
  return {
    ...state,
    setState: function ( object: { [ key: string ]: any } ) {
      return setState( ( oldState ) => Object.assign( {}, oldState, object ) )
    }
  }
}