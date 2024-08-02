import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";

interface ParamsType {
  params: {
    id: string;
  };
}

export async function getOrder(id: string) {
  return await db.orders.findUnique({
    where: { id },
    include: {
      user: true,
      OrderedProduct: {
        include: {
          order: true,
          product: true,
        },
      },
    },
  });
}

async function Page({ params }: ParamsType) {
  const order = await getOrder(params.id);
  console.log(order);

  const subtotal = order?.OrderedProduct.reduce((acc, item) => {
    return acc + item.product.price * item.quantity;
  }, 0);

  console.log(subtotal);

  if (subtotal == 0) {
    var ShippingCharges = 0;
  } else {
    ShippingCharges = 200;
  }
  var Tax = Math.round(subtotal * 0.18);
  var Discount = subtotal / 10;
  var Total = subtotal + ShippingCharges + Tax - Discount;

  const MonthNumber = order?.createdAt.getMonth();
  var Month;
  switch (MonthNumber) {
    case 1:
      Month = "January";
      break;

    case 2:
      Month = "February";
      break;
    case 3:
      Month = "March";
      break;
    case 4:
      Month = "April";
      break;
    case 5:
      Month = "May";
      break;
    case 6:
      Month = "June";
      break;
    case 7:
      Month = "July";
      break;
    case 8:
      Month = "August";
      break;
    case 9:
      Month = "September";
      break;
    case 10:
      Month = "October";
      break;
    case 11:
      Month = "November";
      break;
    case 12:
      Month = "December";
      break;

    default:
      break;
  }

  return (
    <Card className="overflow-hidden m-20">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Order {order?.id}
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            ></Button>
          </CardTitle>
          <CardDescription>
            Date:{" "}
            {`${Month} ${order?.createdAt.getDate()} , ${order?.createdAt.getFullYear()}`}
          </CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <DropdownMenu>
            <DropdownMenuTrigger asChild></DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Export</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Trash</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-6 text-sm">
        <div className="grid gap-3">
          <div className="font-semibold">Order Details</div>
          <ul className="grid gap-3">
            {order?.OrderedProduct.map((item) => (
              <li key={item.id} className="flex items-center justify-between">
                <span className="text-muted-foreground">
                  {item.product.name} x <span>{item.quantity}</span>
                </span>
                <span>${item.product.price * item.quantity}</span>
              </li>
            ))}
          </ul>
          <Separator className="my-2" />
          <ul className="grid gap-3">
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>${subtotal?.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Shipping</span>
              <span>${ShippingCharges.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Tax</span>
              <span>${Tax.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Discount</span>
              <span>${Discount.toFixed(2)}</span>
            </li>
            <li className="flex items-center justify-between font-semibold">
              <span className="text-muted-foreground">Total</span>
              <span>${Total.toFixed(2)}</span>
            </li>
          </ul>
        </div>
        <Separator className="my-4" />
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-3">
            <div className="font-semibold">Shipping Information</div>
            <address className="grid gap-0.5 not-italic text-muted-foreground">
              <span>{order?.Address}</span>
              <span>{order?.City}</span>
              <span>{order?.State}</span>
            </address>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="grid gap-3">
          <div className="font-semibold">Customer Information</div>
          <dl className="grid gap-3">
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Customer</dt>
              <dd>{order?.user.username}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-muted-foreground">Email</dt>
              <dd>
                <a href="mailto:">{order?.email}</a>
              </dd>
            </div>
          </dl>
        </div>
      </CardContent>
      <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
        <div className="text-xs text-muted-foreground"></div>
      </CardFooter>
    </Card>
  );
}

export default Page;
