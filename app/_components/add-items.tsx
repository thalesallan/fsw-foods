import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";

const AddItems = () => {
  const [quantity, Setquantity] = useState(1);

  const incrementQuantity = () =>
    Setquantity((currentState) => currentState + 1);
  const decrementQuantity = () =>
    Setquantity((currentState) =>
      currentState > 1 ? currentState - 1 : currentState,
    );

  return (
    <div className="flex items-center">
      <Button
        size="icon"
        variant="ghost"
        className="border border-solid border-muted-foreground"
        onClick={decrementQuantity}
      >
        <ChevronLeftIcon />
      </Button>
      <span className="w-8 text-center">{quantity}</span>
      <Button size="icon" onClick={incrementQuantity}>
        <ChevronRightIcon />
      </Button>
    </div>
  );
};

export default AddItems;
