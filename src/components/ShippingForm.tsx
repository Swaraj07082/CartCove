"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import states from "../../public/states.json";

import { RootState } from "@/app/redux/store";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";

const formSchema = z.object({
  address: z.string().min(10, {
    message: "address must be at least 10 characters!",
  }),
  city: z.string().min(2, {
    message: "City name must be at least 2 characters!",
  }),
  state: z.string({ required_error: "Please Select a state!" }),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, {
    message:
      "Invalid pincode. It should be a 6-digit number starting with 1-9.",
  }),
});

export function ShippingForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: "",
      city: "",
      state: "",
      pincode: "",
    },
  });
  const session = useSession();
  console.log(session);

  const email = session.data?.user?.email;

  console.log(email);
  const items = useSelector((state: RootState) => state.cart);
  console.log(items);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);

    const orderedProducts = items.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: "swarajmali100@gmail.com",
        Address: values.address,
        City: values.city,
        State: values.state,
        Pincode: values.pincode,

        OrderedProduct: orderedProducts,
      }),
    });
  }

  return (
    <div className=" gap-y-10 flex-col w-full h-full flex items-center justify-center mt-[3%] ">
      <p className=" text-2xl max-lg:text-xl max-sm:text-[17px]">
        SHIPPING ADDRESS
      </p>
      <div className=" flex flex-col w-[50%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Address..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="City..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? states.find(
                                (language) => language.value === field.value
                              )?.value
                            : "Select state"}
                          <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search framework..."
                          className="h-9"
                        />
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {states.map((language) => (
                            <CommandList key={language.value}>
                              <CommandItem
                                value={language.value}
                                onSelect={() => {
                                  form.setValue("state", language.value);
                                }}
                              >
                                {language.value}
                                <CheckIcon
                                  className={cn(
                                    "ml-auto h-4 w-4",
                                    language.value === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            </CommandList>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Pincode..." {...field} />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full">
              PAY NOW
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
