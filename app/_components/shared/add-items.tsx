"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "../ui/button";
import { createContext, useState } from "react";
import { cn } from "@/app/_lib/utils";

interface AddItemsPropos {
  className?: string;
  size?: number;
}

export interface IAddItemsContex {
  quantity: number;
  handleIncrementQuantity: () => void;
  handleDecrementQuantity: () => void;
}

export const AddItemsContex = createContext<IAddItemsContex>({
  quantity: 1,
  handleIncrementQuantity: () => {},
  handleDecrementQuantity: () => {},
});

export const AddItems = ({ className, size }: AddItemsPropos) => {
  const [quantity, Setquantity] = useState(1);

  const handleIncrementQuantity = () =>
    Setquantity((currentState) => currentState + 1);

  const handleDecrementQuantity = () =>
    Setquantity((currentState) =>
      currentState > 1 ? currentState - 1 : currentState,
    );

  return (
    <AddItemsContex.Provider
      value={{
        quantity,
        handleIncrementQuantity,
        handleDecrementQuantity,
      }}
    >
      <div className="flex items-center">
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "border border-solid border-muted-foreground",
            className,
          )}
          onClick={handleDecrementQuantity}
        >
          <ChevronLeftIcon size={size} />
        </Button>
        <span className="w-8 text-center">{quantity}</span>
        <Button
          size="icon"
          onClick={handleIncrementQuantity}
          className={cn(className)}
        >
          <ChevronRightIcon />
        </Button>
      </div>
    </AddItemsContex.Provider>
  );
};
