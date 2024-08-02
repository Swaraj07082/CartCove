import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { FilterIcon } from "lucide-react";
import { CategorySelect } from "./CategorySelect";
import { SortSelect } from "./GenericSelect";

interface SheetProps {
  value: number;
  setvalue: React.Dispatch<React.SetStateAction<number>>;
  sort: string;
  setsort: React.Dispatch<React.SetStateAction<string>>;
  category: string;
  setcategory: React.Dispatch<React.SetStateAction<string>>;
}
export function SheetDemo({
  value,
  setvalue,
  sort,
  setsort,
  category,
  setcategory,
}: SheetProps) {
  return (
    <Sheet>
      <SheetTrigger className=" " asChild>
        <Button variant="outline">
          <FilterIcon className="h-5 w-5 mr-2" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader></SheetHeader>
        <div className="flex flex-col gap-y-5 mt-10">
          <div className="flex flex-col justify-center gap-y-2  items-start">
            <Label htmlFor="name" className=" text-lg">
              Sort
            </Label>
            <SortSelect sort={sort} setsort={setsort} />
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

            <CategorySelect category={category} setcategory={setcategory} />
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild></SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
