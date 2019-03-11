import * as React from 'react';
import { ErrorHandler } from "../../utils/error";
import { IS_PRODUCTION } from "../../configs";

export class ErrorBoundary extends React.Component<{}, {
  hasError: Boolean;
  info: string;
  message: string;
}> {
  constructor( props ) {
    super( props );
    this.state = { hasError: false, info: '', message: '' };
  }

  componentDidCatch( error, info ) {
    this.setState( { hasError: true, info: info, message: error.message } );
    ErrorHandler.log( error, info )
  }

  render() {
    if ( this.state.hasError ) {
      return (
        <div style={{
          height: '100%',
          backgroundColor: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {
            IS_PRODUCTION ? <div>意外的错误</div> : (
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <p>{this.state.message}</p>
              </div>
            )
          }
        </div>
      )
    }
    return this.props.children;
  }
}