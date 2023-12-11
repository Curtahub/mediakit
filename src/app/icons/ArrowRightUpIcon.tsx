import * as React from "react";
import { SVGProps } from "react";

export const ArrowRightUpIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={14} height={14} fill="none" {...props}>
    <path
      fill={props.color ?? "#0D0D0D"}
      d="M4.667 4.083c0-.322.26-.583.583-.583h4.667c.322 0 .583.261.583.583V8.75a.583.583 0 0 1-1.167 0V5.492l-4.837 4.837a.583.583 0 1 1-.825-.825l4.837-4.837H5.25a.583.583 0 0 1-.583-.584Z"
    />
  </svg>
);
