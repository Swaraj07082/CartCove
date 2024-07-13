"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import states from "../../public/states.json";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import { Card } from "./ui/card";
import { useSession } from "next-auth/react";

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
  // 1. Define your form.
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

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email,
        Address: values.address,
        City: values.city,
        State: values.state,
        Pincode: values.pincode,
      },
    });
  }

  return (
    <div className=" gap-y-10 flex-col w-full h-full flex items-center justify-center mt-[3%] ">
      <p className=" text-2xl">SHIPPING ADDRESS</p>
      <div className=" flex flex-col w-[20%]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Input placeholder="Address..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Input placeholder="City..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem className="flex flex-col ">
                  {/* <FormLabel>Language</FormLabel> */}
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
                  {/* <FormDescription>
                This is the language that will be used in the dashboard.
              </FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel></FormLabel> */}
                  <FormControl>
                    <Input placeholder="Pincode..." {...field} />
                  </FormControl>
                  {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
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
