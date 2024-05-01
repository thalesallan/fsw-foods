import Image from "next/image";

interface ImageProps {
  src: string;
  alt: string;
}

const PromoBanner = ({ src, alt }: ImageProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      height={0}
      width={0}
      className="h-auto w-full object-contain"
      sizes="100vw"
      quality={50}
    />
  );
};

export default PromoBanner;
