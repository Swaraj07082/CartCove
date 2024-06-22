// EuE3SCgmDPcdQBU2

import React from "react";


import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { Card } from "@/components/ui/card";

export default function page() {
  return (
    <>
    <div className=" w-screen h-[40vh] flex flex-col gap-y-10  justify-center items-center my-auto mx-0">

      <div className=" text-3xl">MY ORDERS</div>
<Card className="w-[70%]">
      <Table className=" w-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>QUANTITY</TableHead>
            <TableHead>DISCOUNT</TableHead>
            <TableHead>AMOUNT</TableHead>
            <TableHead>STATUS</TableHead>
            <TableHead>ACTION</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium"></TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
            <TableCell className="text-right"></TableCell>
          </TableRow>
        </TableBody>
      </Table>
</Card>
    </div>
    </>
  );
}
