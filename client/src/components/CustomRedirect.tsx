import { parse } from "query-string";
import React from "react";
import { Redirect } from "react-router";

interface CustomRedirectProps {
  to: string;
  addNextQueryParam?: boolean;
  redirectToNext?: boolean;
}

export const CustomRedirect: React.FC<CustomRedirectProps> = ({
  to,
  addNextQueryParam,
  redirectToNext,
}) => {
  const currentUrl = window.location.pathname;
  if (redirectToNext) {
    let nextUrl: string;
    let { next } = parse(window.location.search);
    if (!next) {
      return <Redirect to={`/`} />;
    }
    if (next instanceof Array) {
      next = next[0];
    }
    nextUrl = next;
    return <Redirect to={`${nextUrl}`} />;
  }
  const nextQueryParam = addNextQueryParam ? currentUrl : "";
  return <Redirect to={`/${to}?next=${nextQueryParam}`} />;
};
