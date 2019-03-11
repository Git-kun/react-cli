import * as React from 'react';

import {ErrorBoundary} from "../../pureComponents/ErrorBoundary";



export function withRoot( Component ) {

  function WithRoot( props ) {
    return (
        <ErrorBoundary>
          <Component {...props} />
        </ErrorBoundary>
    );
  }

  return WithRoot;
}
