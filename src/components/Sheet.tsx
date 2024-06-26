import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SortSelect } from "./GenericSelect";
import { useState } from "react";
import { SortType } from "@/app/search/page";

const filters = [1, 2];

const category = ["cat1", "cat2"];

interface SheetProps {
  value: number;
  setvalue: React.Dispatch<React.SetStateAction<number>>;
  sort: string;
  setsort: React.Dispatch<React.SetStateAction<string>>;
}
export function SheetDemo({ value, setvalue, sort, setsort }: SheetProps) {
  // const [value, setvalue] = useState("10000");

  return (
    <Sheet>
      <SheetTrigger className=" " asChild>
        <Button variant="outline">Filters</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          {/* <SheetTitle>Edit profile</SheetTitle> */}
          {/* <SheetDescription>
            Make changes to your profile here. Click save when you're done.
          </SheetDescription> */}
        </SheetHeader>
        <div className="flex flex-col gap-y-5 mt-10">
          <div className="flex flex-col justify-center gap-y-2  items-start">
            <Label htmlFor="name" className=" text-lg">
              Sort
            </Label>
            <SortSelect sort={sort} setsort={setsort} />
            {/* <Input id="name" value="Pedro Duarte" className="col-span-3" /> */}
          </div>
          <div className="flex flex-col justify-center gap-y-1  items-start">
            <Label htmlFor="username" className="text-lg">
              Max Price:{value}
            </Label>
            <Input
              id="username"
              min={10000}
              type="range"
              max={200000}
              value={value}
              onChange={(e) => {
                setvalue(parseInt(e.target.value));
              }}
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col justify-center gap-y-2  items-start">
            <Label htmlFor="category" className="text-lg">
              Category
            </Label>
            {/* <Input id="category" min={10000} max={200000} value={value} onChange={(e)=>{
                setvalue(e.target.value)
            }} className="col-span-3" /> */}

            {/* <GenericSelect sortlist={category} /> */}
          </div>
          {/* <Button type="submit">Save changes</Button> */}
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
