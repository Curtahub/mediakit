import * as React from "react";
import { SVGProps } from "react";

export const MessageIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={16} height={16} fill="none" {...props}>
    <path
      fill={props.color ?? "#ED243A"}
      fillRule="evenodd"
      d="M16 1.333H0v13.334h16V1.333ZM1.333 3.34v-.672h13.334v.672L8 8.491 1.333 3.339Zm0 1.685v8.31h13.334v-8.31L8 10.176 1.333 5.024Z"
      clipRule="evenodd"
    />
  </svg>
);
