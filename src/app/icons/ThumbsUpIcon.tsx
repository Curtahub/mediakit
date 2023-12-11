import * as React from "react";
import { SVGProps } from "react";

export const ThumbsUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" viewBox="0 0 11 10" {...props}>
    <path fill={props.color ?? "#101010"} d="M2.349 10V4.167H.682V10H2.35Z" />
    <path
      fill={props.color ?? "#101010"}
      fillRule="evenodd"
      d="m4.849 2.697-.834 1.666v4.804H8.5L9.85 6.47V4.583a.417.417 0 0 0-.417-.416h-3.75V1.25a.417.417 0 0 0-.417-.417H4.85v1.864ZM4.015 0h1.25c.69 0 1.25.56 1.25 1.25v2.083h2.917c.69 0 1.25.56 1.25 1.25v2.084L9.015 10H3.182V4.167L4.015 2.5V0Z"
      clipRule="evenodd"
    />
  </svg>
);
