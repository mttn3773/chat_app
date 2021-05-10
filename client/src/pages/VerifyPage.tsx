import React, { useContext, useEffect, useState } from "react";
import { request } from "../utils/request";
import { config } from "../config";
import { dispatchNotify } from "../utils/dispatchNotify";
import { DataContext } from "../store/GlobalState";
import { parse } from "query-string";
interface VerifyProps {}

interface VerifyParams {
  token: string;
}

export const VerifyPage: React.FC<VerifyProps> = ({}) => {
  const { dispatch, state } = useContext(DataContext);
  const { notify } = state;
  const { token, email } = parse(window.location.search);
  const [expired, setExpired] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  useEffect(() => {
    const url = config.endpoints.verify(token as string);
    request({ url, method: "PUT", body: { token } }).then((res) => {
      dispatchNotify(dispatch, res, notify);
      if (res.errors) setExpired(true);
      if (res.success) setSuccess(true);
    });
  }, []);
  const hadndleSendNewLinl = async () => {
    request({
      url: config.endpoints.sendNewVerificationLink,
      method: "POST",
      body: { email },
    }).then((res) => dispatchNotify(dispatch, res, notify));
  };
  return (
    <>
      {expired && (
        <p>
          Your link has expired. Click{" "}
          <a
            onClick={hadndleSendNewLinl}
            style={{ color: "#393bcf", textDecoration: "underline" }}
          >
            here
          </a>{" "}
          to send a new link{" "}
        </p>
      )}
      {success && <p> You account has been verified </p>}
    </>
  );
};
