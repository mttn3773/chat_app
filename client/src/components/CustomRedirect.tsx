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
    const { next } = parse(window.location.search);
    (() => {
      if (!next?.length) return (nextUrl = "");
      if (next && next?.length > 1) return (nextUrl = next[0]);
      return (nextUrl = next as string);
    })();
    return <Redirect to={`/${nextUrl}`} />;
  }
  const nextQueryParam = addNextQueryParam ? currentUrl : "";

  return <Redirect to={`/${to}?next=${nextQueryParam}`} />;
};
