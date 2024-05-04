import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

export const AddItems = () => {
  const [quantity, Setquantity] = useState(1);

  const handleIncrementQuantity = () =>
    Setquantity((currentState) => currentState + 1);
  const handleDecrementQuantity = () =>
    Setquantity((currentState) =>
      currentState > 1 ? currentState - 1 : currentState,
    );

  return (
    <div className="flex items-center">
      <Button
        size="icon"
        variant="ghost"
        className="border border-solid border-muted-foreground"
        onClick={handleDecrementQuantity}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button size="icon" onClick={handleIncrementQuantity}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default AddItems;
