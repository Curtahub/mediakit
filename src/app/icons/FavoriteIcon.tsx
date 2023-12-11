import * as React from "react";
import { SVGProps } from "react";

export const FavoriteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={18} height={18} fill="none" {...props}>
    <path
      fill={props.color ?? "#101010"}
      d="M9 0 6.317 6.068 0 6.875l4.66 4.558L3.438 18 9 14.25 14.562 18l-1.221-6.567L18 6.875l-6.317-.807L9 0Z"
    />
  </svg>
);
