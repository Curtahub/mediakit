import * as React from "react";
import { SVGProps } from "react";

export const CalendarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={12} height={12} fill="none" {...props}>
    <path
      fill={props.color || "#101010"}
      fillRule="evenodd"
      d="M4 1V0H3v1H0v11h12V1H9V0H8v1H4ZM1 2h2v1h1V2h4v1h1V2h2v2H1V2Z"
      clipRule="evenodd"
    />
  </svg>
);
