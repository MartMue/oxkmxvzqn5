import React from "react";

const LoginBox = props => {
  return <div>{props.isOnline ? "Online" : "Offline"}</div>;
};
export default LoginBox;
