import { UserType } from "@/app/dashboard/customers/page";
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

interface props {
  id: string;
  users: UserType[];
  setusers: React.Dispatch<React.SetStateAction<UserType[]>>;
}
export function UserDeleteDialog({ id, users, setusers }: props) {
  async function Delete(id: string) {
    const deleteproduct = await fetch(`/api/users?id=${id}`, {
      method: "DELETE",
    });
    setusers(users.filter((user) => user.id !== id));
  }
  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="outline">Delete</Button>
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
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
