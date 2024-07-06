"use client";
import Image from "next/image";
import Link from "next/link";
import {
  File,
  Home,
  LineChart,
  ListFilter,
  MoreHorizontal,
  Package,
  Package2,
  PanelLeft,
  PlusCircle,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
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
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { DashboardSheet } from "@/components/DashboardSheet";
import { useEffect, useState } from "react";
import DialogDemo from "@/components/AddProductDialog";
import AddProductDialog from "@/components/AddProductDialog";
import { EditDialog } from "@/components/EditDialog";
import { DeleteAlertDialog } from "@/components/DeleteAlertDialog";

export interface ProductType {
  id: string;
  name: string;
  price: number;
  url: string;
  stock: number;
  category: string;
  sales: number;
}

export default function Products() {
  const [products, setproducts] = useState<ProductType[]>([]);

  useEffect(() => {
    const getproducts = async () => {
      const response = await fetch("/api/products");
      const data = await response.json();

      const { products } = data;
      const { stocks } = data;
      console.log(stocks);
      console.log(products);

      setproducts(products);
    };

    getproducts();
  }, []);

  // [products] in dependency cause

  // async function Delete(id: string) {
  //   const deleteproduct = await fetch(`/api/products?id=${id}`, {
  //     method: "DELETE",
  //   });

  //   setproducts(products.filter((product) => product.id !== id));
  // }

  const { toast } = useToast();

  const [id, setid] = useState("");

  const [query, setquery] = useState<string>("");

  const newproducts = products.filter((product)=>
    product.name
  .toLowerCase()
  .split(" ")
  .join("")
  .includes(query.toLowerCase().split(" ").join(""))
  )

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
              <SheetContent side="left" className="sm:max-w-xs"></SheetContent>
            </Sheet>

            {/* <Button size="sm" className="h-8 gap-1">
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
              Add Product
            </span>
          </Button> */}

            <DialogDemo />

            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[1000px]"
                value={query}
                onChange={(e) => {
                  setquery(e.target.value);
                }}
              />
            </div>
          </header>
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <Tabs defaultValue="all">
              <TabsContent value="all">
                <Card x-chunk="dashboard-06-chunk-0">
                  <CardHeader>
                    <CardTitle>Products</CardTitle>
                    <CardDescription>
                      Manage your products and view their sales performance.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead>Name</TableHead>
                          {/* <TableHead>Status</TableHead> */}
                          <TableHead className="hidden md:table-cell">
                            Price
                          </TableHead>
                          <TableHead className="hidden md:table-cell">
                            Total Sales
                          </TableHead>

                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newproducts.map((product) => (
                          <TableRow key={product.id}>
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
                              {product.name}
                            </TableCell>

                            <TableCell className="hidden md:table-cell">
                              {product.price}
                            </TableCell>
                            <TableCell className="hidden md:table-cell">
                              {product.sales}
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
                                    <span className="sr-only">Toggle menu</span>
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>

                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    onClick={() => {
                                      setid(product.id);
                                    }}
                                  >
                                    <EditDialog id={id} products={products} />
                                    {/* <DialogDemo/> */}
                                  </DropdownMenuItem>

                                  <DropdownMenuItem
                                    onSelect={(e) => e.preventDefault()}
                                    onClick={() => {
                                      setid(product.id);
                                      // Delete(product.id);
                                    }}
                                  >
                                    <DeleteAlertDialog
                                      id={id}
                                      setproducts={setproducts}
                                      products={products}
                                    />
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                  <CardFooter>
                    <div className="text-xs text-muted-foreground">
                      Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                      products
                    </div>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
}
