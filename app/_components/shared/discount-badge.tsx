import { Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProp {
  product: Pick<Product, "discountPercentage">;
}

const DiscountBadge = ({ product }: DiscountBadgeProp) => {
  return (
    <div className="flex items-center gap-[2px] rounded-full bg-primary px-[0.50rem] py-[4px] text-white">
      <ArrowDownIcon size={12} />
      <span className="text-xs font-semibold">
        {product.discountPercentage}%
      </span>
    </div>
  );
};

export default DiscountBadge;
