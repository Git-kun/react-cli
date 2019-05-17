import { apiBasePath, IS_DEV } from "../../configs/BasePath";
import utils from "../../utils";
import { ROUTER_NAME } from "../../router";
import { ErrorHandler } from "../../utils/HandlerError";

interface object_type {
  [ key: string ]: number | string | object_type
}

function checkApiStatus ( response ) {
  // 判断 api 的 请求状态码
  if ( (response.status >= 200 && response.status < 300) || response.status === 304 ) {
    return Promise.resolve( response )
  } else {
    return Promise.reject( { code: response.status, message: '状态码错误' } )
  }
}

function parseJSON ( response ) {
  // 这里判断 返回的是否是 json, 需要处理如果 不是 json 的情况
  try {
    return response.json();
  } catch ( e ) {
    return Promise.reject( { code: 200, message: '登录信息已过期!' } )
  }
}

function checkApiResponse ( response ) {
  // 判断后台的返回 状态码
  if ( response.code === 0 ) {
    return response
  } else {
    return Promise.reject( { code: 200, api_code: response.code, message: response.message } )
  }
}

function AppendToFormData ( data: { [ key: string ]: string } | FormData, bool = false ): string | FormData {


  if ( utils.isFormData( data ) ) {
    let temp: any = data;
    return temp;
  }


  if ( !bool ) {
    return JSON.stringify( data )
  }

  const formData = new FormData();
  for ( const [ key, value ] of Object.entries( data ) ) {
    formData.append( key, value );
  }
  return formData
}


function JoinUrl ( params: { [ key: string ]: string } ) {
  const joins = [];
  for ( const [ key, value ] of Object.entries( params ) ) {
    joins.push( encodeURIComponent( key ) + '=' + encodeURIComponent( value ) );
  }
  return joins.join( '&' )
}


export const Net = ( path, body = {}, options: { headers?: any, params?: { [ key: string ]: string } } = {} ) => {
  let url = apiBasePath + path;
  let headers = {};
  if ( !utils.isFormData( body ) ) {
    headers = {
      "Content-Type": "application/json;charset=utf8"
    }
  }

  if ( options.headers ) {
    headers = Object.assign( headers, options.headers )
  }

  if ( !utils.isObjectEmpty( options.params ) ) {
    url += '?' + JoinUrl( options.params );
  }

  if ( !utils.isObject( body ) && !utils.isFormData( body ) ) {
    throw new Error( 'The body is not the object! or FormData==== api_url=' + path );
  }


  return fetch( url, {
    body: AppendToFormData( body ),
    // Blob | BufferSource | FormData | URLSearchParams | ReadableStream | string;
    method: 'POST',
    headers: headers,
    credentials: 'include'
  } )
    .then( checkApiStatus )
    .then( parseJSON )
    .then( checkApiResponse )
    .catch( errMessage => {

      if ( IS_DEV ) {
        console.log( errMessage, url, body, options )
      }
      if ( errMessage.message.includes( 'Failed to fetch' ) || errMessage.message.includes( 'Unexpected token < in JSON at position 0' ) ) {
        utils.replaceTo( ROUTER_NAME.LOGIN )
        throw new Error( '登陆已过期,请重新登陆!' );
      } else {
        return errMessage
      }
    } )
}

export async function PostRequest ( url, param = {}, body = {} ) {
  try {
    const res = await Net( url, body, { params: param } );
    if ( res.code === 0 ) {
      return Promise.resolve( res );
    } else {
      return Promise.reject( res );
    }
  } catch ( e ) {
    return Promise.reject( e.message );
  }
}
