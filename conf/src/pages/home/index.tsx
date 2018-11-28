import * as React from "react";
import * as styles from "../message/index.css";
import { Msg } from "react-weui";

export class HomePage extends React.Component {
  render() {
    return (
      <Msg
        type={"success"}
        title={"付款成功"}
        description={"We have received your feedback"}
        footer={() => (<div className="bounceInLeft">页脚部分</div>)}
        buttons={[
          {
            type: 'primary',
            label: 'Ok'
          },
          {
            type: 'default',
            label: 'Cancel',
            onClick: () => {
              console.log('cacla');
            }
          }
        ]}
        ></Msg>
    )
  }
}