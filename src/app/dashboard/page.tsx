"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Dashboard, StockType } from "@/components/Dashboard";
import { MoreHorizontal, PanelLeft, Search } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { OrderWithProducts } from "./transactions/page";
import SignUpForm from "@/components/SignUpForm";
import LoginForm from "@/components/LoginForm";

const formSchema = z.object({
  username: z.string().min(3, {
    message: "Username must be at least 3 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address",
  }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .max(100, { message: "Password must be at most 100 characters long" })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character",
    }),
});

export default function DashboardPage() {
  const router = useRouter();
  const [eyeopen, seteyeopen] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: values.username,
        email: values.email,
        password: values.password,
      }),
    });

    if (response.ok) {
      router.push("/login");
    }
  }

  const session = useSession();
  console.log(session);

  const email = session?.data?.user?.email;
  console.log(email);

  const [users, setusers] = useState<number>(0);
  const [orders, setorders] = useState<number>(0);
  const [products, setproducts] = useState<number>(0);
  const [stocks, setstocks] = useState<StockType[]>([]);
  const [totalRevenue, settotalRevenue] = useState<number>(0);
  const [userOrders, setuserOrders] = useState<OrderWithProducts[]>([]);

  useEffect(() => {
    if (session.status === "authenticated" && email) {
      const getTotalRevenue = async () => {
        const response = await fetch("/api/revenueByCategory");
        const data = await response.json();
        const { totalRevenue } = data;
        settotalRevenue(totalRevenue);

        const getUserOrders = async () => {
          const response = await fetch(`/api/userOrders?email=${email}`);
          console.log(response);
          const data = await response.json();

          const { userOrders } = data;
          console.log(userOrders);
          setuserOrders(userOrders);
        };

        getUserOrders();
      };

      getTotalRevenue();

      const getusers = async () => {
        const usercount = await fetch("/api/users");
        const response = await usercount.json();
        const { count } = response;
        setusers(count);
      };
      getusers();

      const getorders = async () => {
        const ORDER_COUNT = await fetch("/api/orders");
        const response = await ORDER_COUNT.json();
        const { ordercount } = response;
        const { orders } = response;
        setorders(ordercount);
      };
      getorders();

      const getproducts = async () => {
        const response = await fetch("/api/products");
        const data = await response.json();
        const { productcount } = data;
        const { stocks } = data;
        setstocks(stocks);
        setproducts(productcount);
      };
      getproducts();
    }
  }, [session.status, email]);

  console.log(totalRevenue);

  const calculateSubtotal = (order: OrderWithProducts) => {
    return order.OrderedProduct.reduce((acc, item) => {
      return acc + item.product.price * item.quantity;
    }, 0);
  };

  if (
    email == process.env.NEXT_PUBLIC_ADMIN_URL &&
    session.status == "authenticated"
  ) {
    return (
      <>
        <Dashboard
          users={users}
          orders={orders}
          products={products}
          stocks={stocks}
          totalRevenue={totalRevenue}
        />
      </>
    );
  } else if (session.status == "unauthenticated") {
    return (
      <>
        <SignUpForm />
      </>
    );
  } else if (session.status == "loading") {
    <div>Loading...</div>;
  } else
    return (
      <>
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button size="icon" variant="outline" className="sm:hidden">
                    <PanelLeft className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="left"
                  className="sm:max-w-xs"
                ></SheetContent>
              </Sheet>

              <Button onClick={() => signOut()}>Logout</Button>
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search by email..."
                  className="w-full rounded-lg bg-background pl-8 sm:w-[300px] md:w-[200px] lg:w-[500px]"
                />
              </div>
            </header>
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              {userOrders.length == 0 ? (
                <>
                  <div className=" whitespace-nowrap flex items-center justify-center mt-40  ">
                    <h2 className=" text-xl">You have no transactions! </h2>
                  </div>
                </>
              ) : (
                <>
                  <Tabs defaultValue="all">
                    <TabsContent value="all">
                      <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader className=" text-center">
                          <CardTitle>TRANSACTIONS</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead className="hidden w-[100px] sm:table-cell">
                                  <span className="sr-only">Image</span>
                                </TableHead>
                                <TableHead>OrderId</TableHead>
                                {/* <TableHead>Status</TableHead> */}
                                <TableHead className="hidden md:table-cell">
                                  Email
                                </TableHead>
                                <TableHead className="hidden md:table-cell">
                                  Amount
                                </TableHead>
                                <TableHead>
                                  <span className="sr-only">Actions</span>
                                </TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {userOrders.map((order) => (
                                <TableRow key={order.id}>
                                  <TableCell className="hidden sm:table-cell">
                                    <Image
                                      alt="Product image"
                                      className="aspect-square rounded-md object-cover"
                                      height="64"
                                      src="/placeholder.svg"
                                      width="64"
                                    />
                                  </TableCell>
                                  <TableCell className="font-medium">
                                    {order.id}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {order.email}
                                  </TableCell>
                                  <TableCell className="hidden md:table-cell">
                                    {calculateSubtotal(order).toFixed(2)}
                                  </TableCell>
                                  <TableCell>
                                    <DropdownMenu modal={false}>
                                      <DropdownMenuTrigger asChild>
                                        <Button
                                          aria-haspopup="true"
                                          size="icon"
                                          variant="ghost"
                                        >
                                          <MoreHorizontal className="h-4 w-4" />
                                          <span className="sr-only">
                                            Toggle menu
                                          </span>
                                        </Button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                          Actions
                                        </DropdownMenuLabel>

                                        <DropdownMenuItem
                                          onSelect={(e) => e.preventDefault()}
                                        >
                                          <Link
                                            href={`dashboard/transactions/${order.id}`}
                                          >
                                            View Details...
                                          </Link>
                                        </DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </>
              )}
            </main>
          </div>
        </div>
      </>
    );
}
