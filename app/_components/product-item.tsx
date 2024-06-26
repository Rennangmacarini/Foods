"use client"

import { Prisma} from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";
import Link from "next/link";


interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
        };
      };
    };
  }>;
}

const ProductItem = ({ product }: ProductItemProps) => {
  return (
    <Link className="w-[150px] min-w-[150px]" href={`/products/${product.id}`}>
    <div className="w-full space-y-2">
      <div className="relative h-[150px] w-full">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shadow-md"
        />
        {product.discountPercentage && (
          <div className="absolute gap-[2px] left-2 top-2 flex items-center rounded-full bg-primary px-2 py-[2px] text-white">
            <ArrowDownIcon size={12} />
            <span className="semibold text-xs">
              {product.discountPercentage}%
            </span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="flex items-center gap-1">
          <h3 className="font-semibold">
            {formatCurrency(calculateProductTotalPrice(product))}
          </h3>

          {product.discountPercentage > 0 && (
            <span className="text-xs text-muted-foreground line-through">
              {formatCurrency(calculateProductTotalPrice(product))}
            </span>
          )}
        </div>
        <span className="block text-muted-foreground">{product.restaurant.name}</span>
      </div>
    </div>
    </Link>
  );
};

export default ProductItem;
