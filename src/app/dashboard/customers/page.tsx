"use client";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Search } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

import { DashboardSheet } from "@/components/DashboardSheet";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { UserDeleteDialog } from "@/components/UserDeleteDialog";

interface OrderType {
  id: string;
  email: string;
  user: UserType;
}
export interface UserType {
  id: string;
  username: string;
  image?: string;
  gender?: string;
  dob?: number;
  email: string;
  password: string;
  orders: OrderType[];
}

export default function Page() {
  const [users, setusers] = useState<UserType[]>([]);

  useEffect(() => {
    const getusers = async () => {
      const allusers = await fetch("http://localhost:3000/api/users");
      const response = await allusers.json();
      const { users } = response;
      console.log(users);
      setusers(users);
    };

    getusers();
  }, []);

  console.log(users);

  const [id, setid] = useState("");

  const [query, setquery] = useState<string>("");

  const newusers = users.filter((user) =>
    user.username
      .toLowerCase()
      .split(" ")
      .join("")
      .includes(query.toLowerCase().split(" ").join(""))
  );

  console.log(id);
  return (
    <>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
            <DashboardSheet />

            <div className="relative ml-auto flex-1 md:grow-0 ">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[500px]"
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
                  <CardHeader className="text-center">
                    <CardTitle>Customers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead className="hidden w-[100px] sm:table-cell">
                            <span className="sr-only">Image</span>
                          </TableHead>
                          <TableHead className="max-sm:hidden">Name</TableHead>
                          <TableHead className=" md:table-cell">
                            Email
                          </TableHead>

                          <TableHead>
                            <span className="sr-only">Actions</span>
                          </TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {newusers.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="hidden sm:table-cell">
                              <Image
                                alt="Product image"
                                className="aspect-square rounded-md object-cover"
                                height="64"
                                src="/placeholder.svg"
                                width="64"
                              />
                            </TableCell>
                            <TableCell className="font-medium  max-sm:hidden">
                              {user.username}
                            </TableCell>

                            <TableCell className=" md:table-cell">
                              {user.email}
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
                                    onClick={(e) => {
                                      setid(user.id);
                                    }}
                                  >
                                    <UserDeleteDialog
                                      id={id}
                                      users={users}
                                      setusers={setusers}
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
                      Showing all customers
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
