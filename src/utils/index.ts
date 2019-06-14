import is from '@sind'

export default class Util {

  static is = is;

  /**
   * 将base64转换为文件
   * @param dataUrl
   * @param filename
   */
  static dataURLtoFile ( dataUrl: string, filename: string ) {
    let arr = dataUrl.split( ',' );
    const mime = arr[ 0 ].match( /:(.*?);/ )[ 1 ];
    const bstr = atob( arr[ 1 ] );
    let n = bstr.length;
    const u8arr = new Uint8Array( n );
    while ( n-- ) {
      u8arr[ n ] = bstr.charCodeAt( n );
    }
    return new File( [ u8arr ], filename + '.' + mime.split( '/' )[ 1 ], { type: mime } );
  }


  /**
   * object to url params
   * @param param
   */
  static serialization ( param: { [ key: string ]: string } ): string {
    let array = [];
    for ( let [ key, value ] of Object.entries( param ) ) {
      array.push( encodeURIComponent( key ) + '=' + encodeURIComponent( value ) );
    }
    return array.join( '&' );
  }


  /**
   * 获取url参数
   * @param str
   */
  static getParams ( str = window.location.search ): URLSearchParams {
    return new window.URLSearchParams( str )
  }


  /**
   * 等待一段时间
   * @param time
   */
  static sleep ( time ) {
    return new Promise( ( resolve, reject ) => {
      setTimeout( () => {
        resolve( 0 )
      }, time )
    } )
  }
}




