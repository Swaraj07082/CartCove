import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle } from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";

export function DialogDemo() {
  const [ProductName, setProductName] = useState<string>("");
  const [price, setprice] = useState<number>(0);
  const { toast } = useToast();

  function OnSubmit() {
    const productnameRegex = /^[a-zA-Z]{2,}$/;
    if (price <= 0) {
      toast({
        variant: "destructive",
        description: "Price should not be zero or negative",
      });
    } else if (!productnameRegex.test(ProductName)) {
      toast({
        variant: "destructive",
        description:
          "Product Name should be at least 2 alphabets and no numbers or special characters",
      });
    } else {
      toast({
        description: "New Product Added",
      });

      console.log(ProductName, price);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" className="h-8 gap-1">
          <PlusCircle className="h-3.5 w-3.5" />
          <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
            Add Product
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
              value={ProductName}
              onChange={(e) => {
                setProductName(e.target.value);
              }}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
              type="number"
              value={price}
              onChange={(e) => {
                setprice(parseInt(e.target.value));
              }}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={OnSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
