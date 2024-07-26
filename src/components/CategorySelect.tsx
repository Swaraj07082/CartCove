import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import products from "../../public/Dummyshoes.json";

interface CategorySelectProps {
  category: string;
  setcategory: React.Dispatch<React.SetStateAction<string>>;
}

export function CategorySelect({ category, setcategory }: CategorySelectProps) {
  return (
    <Select
      value={category}
      onValueChange={(value) => {
        setcategory(value);
      }}
    >
      <SelectTrigger className="w-full mb-3">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          {products.map((product) => (
            <SelectItem key={product.id} value={product.category}>
              {product.category}
            </SelectItem>
          ))}
          {/* <SelectItem key="3324fcd" value="All">
            All
          </SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
