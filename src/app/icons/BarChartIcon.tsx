import * as React from "react";
import { SVGProps } from "react";

export const BarChartIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg width={11} height={10} fill="none" viewBox="0 0 11 10" {...props}>
    <path
      fill={props.color ?? "#101010"}
      d="M5.682.833c.269 0 .486.234.486.521v7.292c0 .288-.217.52-.486.52-.268 0-.486-.232-.486-.52V1.354c0-.287.218-.52.486-.52Zm2.43 2.084c.27 0 .487.233.487.52v5.209c0 .288-.218.52-.486.52-.269 0-.486-.232-.486-.52V3.438c0-.288.217-.521.486-.521ZM3.253 5c.268 0 .486.233.486.521v3.125c0 .288-.218.52-.486.52-.269 0-.487-.232-.487-.52V5.521c0-.288.218-.52.487-.52Z"
    />
  </svg>
);
