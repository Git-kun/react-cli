import { API_BASE } from "../configs";
import { Utils } from "./index";
import { Routing } from './routing'
import { LOGIN_PAGE, ROUTER_PAGES } from "../router/pages";

interface Obj {
  [ key: string ]: any
}

interface OptionsProps {
  headers?: Obj
  params?: Obj
  body?: Obj
  defaultUrl?: boolean,
  method?: 'POST' | "GET"
}

export const Net = ( path: string, options: OptionsProps = {} ): Promise<any> => {
  let url = path;
  if ( !options.defaultUrl ) {
    url = API_BASE + path
  }

  let headers = {
    "Content-Type": Utils.isFormData( options.body ) ? "multipart/form-data" : "application/json;charset=utf8"
  }

  if ( options.headers ) {
    headers = Object.assign( headers, options.headers )
  }

  if ( options.params && Object.keys( options.params ).length > 0 ) {
    url += '?' + JoinUrl( options.params );
  }


  return fetch( url, {
    body: AppendToFormData( options.body ),  // Blob | BufferSource | FormData | URLSearchParams | ReadableStream | string;
    method: options.method || 'POST',
    headers: headers,
    credentials: 'include',
    mode: 'cors'
  } )
    .then( checkApiStatus )
    .then( parseJSON )
    .then( checkApiResponse )
    .catch( errMessage => {
      console.log( errMessage, url, options.body, options )
      // if ( errMessage.message.includes( 'Failed to fetch' ) || errMessage.message.includes( 'Unexpected token < in JSON at position 0' ) ) {
      //   // sessionStorage.setItem('IS_LOGIN','false')
      //   // Routing.replace( LOGIN_PAGE )
      //   return Promise.reject(new Error( '登陆已过期,请重新登陆!' ));
      // } else {
      //   return Promise.reject(errMessage)
      // }
      console.log( errMessage )
      Promise.reject( errMessage )
    } )
}

function checkApiStatus( response ) {

  // 判断 api 的 请求状态码
  if ( response.status >= 200 && response.status < 300 || response.status === 304 ) {
    return Promise.resolve( response )
  } else {
    return Promise.reject( response.status )
  }
}

function parseJSON( response ) {
  // 这里判断 返回的是否是 json, 需要处理如果 不是 json 的情况
  try {
    return response.json();
  } catch ( e ) {
    return Promise.reject( response.text() )
  }
}

function checkApiResponse( response ) {
  // 判断后台的返回 状态码
  if ( response.code === 0 ) {
    return response
  } else {
    return Promise.reject( response )
  }
}

// 添加到 body
function AppendToFormData( data: any, bool = false ) {
  if ( Utils.isFormData( data ) ) {
    return data
  }
  return JSON.stringify( data )

  // if ( Utils.isObject( data ) ) {
  //   return JSON.stringify( data )
  //
  //   // const formData = new FormData();
  //   // for ( const [ key, value ] of Object.entries( data ) ) {
  //   //   formData.append( key, value as string );
  //   // }
  //   // return formData
  // }
  //
  // return ''

}

// 合并参数
function JoinUrl( params: Obj ): string {
  const joins = [];
  for ( const [ key, value ] of Object.entries( params ) ) {
    joins.push( key + '=' + value );
  }
  return joins.join( '&' )
}


// 下载文件
export function DownloadFile( url ) {
  return new Promise( ( resolve, reject ) => {
    fetch( url, { method: 'GET', } )
      .then( res => {
        return {
          data: res.blob(),
          fileName: res.headers.get( 'Content-Disposition' ).split( '=' )[ 1 ]
        }
      } )
      .then( ( res ) => {
        res.data.then( blobData => {
          let blobUrl = window.URL.createObjectURL( blobData );
          const a = document.createElement( 'a' );
          a.href = blobUrl;
          a.download = decodeURIComponent( res.fileName );
          a.click();
          resolve( 'ok' );
        } )
      } )
      .catch( err => {
        reject( err )
      } )
  } )
}
