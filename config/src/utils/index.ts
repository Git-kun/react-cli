

function getObjectType( data ) {
  return Object.prototype.toString.call( data ).split( ' ' )[ 1 ].replace( ']', '' );
}

export const Utils = {
  isType( data, type: 'string' ) {
    return Object.prototype.toString.call( data ).split( ' ' )[ 1 ].replace( ']', '' ) === type
  },
  isNumber( data ) {
    return getObjectType( data ) === 'Number' && !isNaN( data )
  },
  isArray( data ) {
    return getObjectType( data ) === 'Array'
  },
  isFunction( data ) {
    return getObjectType( data ) === 'Function'
  },
  isObject( data ) {
    return getObjectType( data ) === 'Object'
  },
  isFormData( data ) {
    return getObjectType( data ) === 'FormData'
  },
  //将base64转换为文件
  dataURLtoFile( dataurl, filename ) {
    let arr = dataurl.split( ',' ), mime = arr[ 0 ].match( /:(.*?);/ )[ 1 ],
      bstr = atob( arr[ 1 ] ), n = bstr.length, u8arr = new Uint8Array( n );
    while ( n-- ) {
      u8arr[ n ] = bstr.charCodeAt( n );
    }
    return new File( [ u8arr ], filename + '.' + mime.split( '/' )[ 1 ], { type: mime } );
  },
}


