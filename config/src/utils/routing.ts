import createBrowserHistory from 'history/createBrowserHistory';
import createHashHistory from 'history/createHashHistory'
import { IS_HASH_ROUTER } from "../configs";

export const history = IS_HASH_ROUTER ? createHashHistory() : createBrowserHistory();


export const Routing = {
  // 参数有重复的会覆盖
  getParams( search?: string ): Map<string, string> {
    search = window.location.search === '' ? window.location.hash : window.location.search;
    const gapIndex = search.indexOf('?')

    let str = gapIndex !== -1 ? search.substring( gapIndex+1 ) : search;

    let strArray = [];
    if ( str.includes( '&' ) ) {
      strArray = str.split( '&' );
    } else {
      strArray = [ str ]
    }

    let params = new Map();
    for ( const item of strArray ) {
      // 因为 login 页 可能会有 重定向参数, 所以不能使用 split
      let i = item.indexOf( '=' );
      let key = item.substring( 0, i );
      let value = item.substring( i + 1 );
      params.set( key, value );
    }
    return params;
  },
  loginRedirect( search ) {
    let pages = ''
    let param = {}
    search = decodeURIComponent( search )
    if ( search.includes( '?' ) ) {
      pages = search.split( '?' )[ 0 ]

      let pr = search.split( '?' )[ 1 ];

      if ( pr.includes( '&' ) ) {
        for ( let item of  pr.split( '&' ) ) {
          let [ key, value ] = item.split( '=' );
          param[ key ] = value;
        }
      } else {
        let [ key, value ] = pr.split( '=' );
        param[ key ] = value;
      }

    } else {
      pages = search
    }
    return { pages, param }
  },
  back( page_number?: number ) {
    if ( page_number ) {
      history.go( page_number )
    } else {
      history.goBack();
    }
  },
  forward() {
    history.goForward()
  },
  go( pageNumber: number ) {
    history.go( pageNumber );
  },
  // 合并参数
  JoinUrl( params: any ): string {
    if ( !params ) {
      return ''
    }
    const joins = [];
    for ( const [ key, value ] of Object.entries( params ) ) {
      joins.push( encodeURIComponent( key ) + '=' + encodeURIComponent( value as string ) );
    }
    return joins.join( '&' )
  },
  refresh() {
    window.location.href = window.location.href
  },
  jumpTo( routerName: any, params?: any ) {
    let path = routerName.path;

    if ( path ) {
      path += '?' + this.JoinUrl( params );
    }
    history.push( path )
  },
  replace( routerName: any, params?: any ) {
    let path = routerName.path;

    if ( path ) {
      path += '?' + this.JoinUrl( params );
    }
    console.log(path)
    history.replace( path )
  }
}


