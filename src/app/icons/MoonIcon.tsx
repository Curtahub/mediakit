import * as React from "react";
import { SVGProps } from "react";

export const MoonIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={12} height={12} fill="none" {...props}>
    <path
      fill={props.color ?? "#fff"}
      d="M4.68 1.646a.5.5 0 0 1 .093.579 3.725 3.725 0 0 0 5.002 5.002.5.5 0 0 1 .672.671 4.725 4.725 0 1 1-6.345-6.345.5.5 0 0 1 .578.093Z"
    />
  </svg>
);
