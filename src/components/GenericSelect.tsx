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

interface SortSelectProps {
  sort: string;
  setsort: React.Dispatch<React.SetStateAction<string>>;
}

export function SortSelect({ sort, setsort }: SortSelectProps) {
  console.log(sort);
  return (
    <Select
      value={sort.toString()}
      onValueChange={(value) => {
        const new_val = value.replace(/\s+/g, "").toLowerCase();
        setsort(new_val);
      }}
    >
      <SelectTrigger className="w-full mb-3">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          {Sort.map((list) => (
            <SelectItem key={list.sortid} value={list.text}>
              {list.text}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
