import * as React from "react";
import {
  Input
} from "react-weui";

export function Login() {
  return (
    <>
      <Input defaultValue="请输入用户名"></Input>
      <Input defaultValue="请输入密码"></Input>
    </>
  );
}