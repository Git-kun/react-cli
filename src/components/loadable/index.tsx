/**
 * @author: hukun
 * @Date: 2019-06-14 11:05
 * @description
 */
import * as React from 'react';
import loadable from 'react-loadable'
import { Loading } from '../loading'

export function LoadableComponent ( func: () => Promise<any> ): any {
  return loadable( {
    loader: func,
    loading: Loading,
  } );
}
