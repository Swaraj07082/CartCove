import * as React from "react";
import { Sort } from "@/app/search/page";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortType } from "@/app/search/page";

interface GenericSelectProps {
  sort: string;
  setsort: React.Dispatch<React.SetStateAction<string>>;
}

export function GenericSelect({ sort, setsort }: GenericSelectProps) {
  // const [value, setvalue] = React.useState("");
  console.log(sort);
  return (
    <Select
      value={sort}
      onValueChange={(value) => {
        setsort(value.replace(/\s+/g, "").toLowerCase());
      }}
    >
      <SelectTrigger className="w-full mb-3">
        <SelectValue
          placeholder="Sort"
          // className="placeholder:text-black"
        />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel className="text-black">Sort by</SelectLabel>
          {Sort.map((list) => (
            <SelectItem key={list.sortid} value={list.text}>
              {list.text}
            </SelectItem>
          ))}
          {/* <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem> */}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
