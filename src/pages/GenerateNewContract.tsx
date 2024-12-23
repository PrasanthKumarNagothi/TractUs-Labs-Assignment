"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
} from "@/components/ui/alert-dialog";

import { Input } from "@/components/ui/input";
import { GalleryVerticalEnd, ArrowLeftFromLine } from "lucide-react";
import { faker } from "@faker-js/faker";

import { useState } from "react";
import CustomSelect from "@/components/CustomSelect";
import axios from "axios";
import { Link } from "react-router-dom";

const formSchema = z.object({
    contract_id: z.string(),
    client_name: z
        .string()
        .min(2, {
            message: "Client name must be at least 2 characters.",
        })
        .max(50, {
            message: "Client name must be at max 50 characters.",
        }),
    start_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date",
    }),
    end_date: z.string().refine((date) => !isNaN(Date.parse(date)), {
        message: "Invalid date",
    }),
    status: z.string(),
    contract_value: z.string().regex(/^\d+$/, {
        message: "The field must contain only numbers",
    }),
});

export default function GenerateNewContract() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contract_id: faker.string.uuid(),
            client_name: "",
            start_date: "",
            end_date: "",
            status: "",
            contract_value: "",
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.status = value;
        await axios.post(
            "https://6762644f46efb37323746876.mockapi.io/api/contract",
            values,
            {
                headers: { "content-type": "application/json" },
            }
        );
        openDialog();
    }

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState("");
    const status = [
        {
            value: "active",
            label: "Active",
        },
        {
            value: "completed",
            label: "Completed",
        },
        {
            value: "terminated",
            label: "Terminated",
        },
        {
            value: "draft",
            label: "Draft",
        },
    ];

    return (
        <>
            <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm flex-col gap-6">
                    <div className="flex justify-between">
                        <Link
                            to="/"
                            className="flex items-center gap-2 self-center font-medium"
                        >
                            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
                                <GalleryVerticalEnd className="size-4" />
                            </div>
                            TractUs Labs.
                        </Link>

                        <Link to={"/"}>
                            <Button>
                                <ArrowLeftFromLine /> Back to Dashboard
                            </Button>
                        </Link>
                    </div>
                    <div className="mt-12">
                        <Form {...form}>
                            <form
                                onSubmit={form.handleSubmit(onSubmit)}
                                className="space-y-8"
                            >
                                <FormField
                                    control={form.control}
                                    name="client_name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Client Name</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the client name"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="start_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Start Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    placeholder="Start Date"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="end_date"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>End Date</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="date"
                                                    placeholder="End Date"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="status"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel>Status</FormLabel>
                                            <FormControl>
                                                <span className="ml-4">
                                                    <CustomSelect
                                                        open={open}
                                                        setOpen={setOpen}
                                                        value={value}
                                                        setValue={setValue}
                                                        status={status}
                                                    ></CustomSelect>
                                                </span>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="contract_value"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>
                                                Contract Value
                                            </FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Enter the contract value"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">Submit</Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>

            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Contract Added Successfully
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            The new contract record has successfully added. You
                            can see this new record in the Dashboard.
                            <Link to="/">Click Here to see Dashboard</Link>
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeDialog}>
                            Close
                        </AlertDialogCancel>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
