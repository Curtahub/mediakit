import * as React from "react";
import { SVGProps } from "react";

export const VisibleIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" viewBox="0 0 11 10" {...props}>
    <path
      fill={props.color ?? "#101010"}
      fillRule="evenodd"
      d="M7.557 5a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Z"
      clipRule="evenodd"
    />
    <path
      fill={props.color ?? "#101010"}
      fillRule="evenodd"
      d="M5.682 8.333c2.5 0 4.375-2.291 5-3.437-.73-1.076-2.5-3.23-5-3.23s-4.27 2.154-5 3.23c.625 1.146 2.5 3.437 5 3.437Zm-2.67-1.929a7.319 7.319 0 0 1-1.33-1.471A8.055 8.055 0 0 1 3.037 3.53C3.79 2.93 4.68 2.5 5.682 2.5c1.001 0 1.89.43 2.646 1.03.559.445 1.017.961 1.354 1.403a7.319 7.319 0 0 1-1.33 1.471C7.582 7.046 6.67 7.5 5.682 7.5c-.988 0-1.9-.454-2.67-1.096Z"
      clipRule="evenodd"
    />
  </svg>
);
