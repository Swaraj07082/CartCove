import { ProductType } from "@/app/dashboard/product/page";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";

interface Props {
  id: string;
  products: ProductType[];
  setproducts: Dispatch<SetStateAction<ProductType[]>>;
}
export function DeleteAlertDialog({ id, setproducts, products }: Props) {
  async function Delete(id: string) {
    const deleteproduct = await fetch(`/api/products?id=${id}`, {
      method: "DELETE",
    });
    setproducts(products.filter((product) => product.id !== id));
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Show Dialog</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className=" max-sm:w-48">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onSelect={(e) => e.preventDefault()}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onSelect={(e) => e.preventDefault()}
            onClick={() => {
              Delete(id);
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
