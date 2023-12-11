import React, { useState } from "react";
import Image from "next/image";

const ImageWithFallback = (props: any) => {
  const { src, ...rest } = props;
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      alt="Image"
      src={imgSrc}
      onError={() => {
        setImgSrc("/no-image.png");
      }}
      {...rest}
    />
  );
};

export default ImageWithFallback;
