"use client";

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
import CustomSelect from "@/components/CustomSelect";
import { FileEdit } from "lucide-react";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useContractContext } from "@/components/ContractContextProvider";

const formSchema = z.object({
    contract_id: z.string(),
    client_name: z.string().min(2).max(50),
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

function ModalForm(props: {
    contract: {
        contract_id: string;
        client_name: string;
        start_date: string;
        end_date: string;
        status: string;
        contract_value: number;
    };
}) {
    const { fetchData } = useContractContext();

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(props.contract.status);
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

    const formatSnakeToTitleCase = (snakeCaseString: string): string => {
        return snakeCaseString
            .split("_")
            .map(
                (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(" ");
    };

    const fieldTypeConfig = {
        dateFields: ["start", "end", "created", "updated", "timestamp"],
        numberFields: ["contract_value", "amount"],
        emailFields: ["email", "contact_email"],
        phoneFields: ["phone", "mobile", "contact_number"],
    };

    const getInputType = (key: string): string => {
        if (
            fieldTypeConfig.dateFields.some((keyword) =>
                key.toLowerCase().includes(keyword)
            )
        ) {
            return "date";
        }
        if (
            fieldTypeConfig.numberFields.some((keyword) =>
                key.toLowerCase().includes(keyword)
            )
        ) {
            return "number";
        }
        if (
            fieldTypeConfig.emailFields.some((keyword) =>
                key.toLowerCase().includes(keyword)
            )
        ) {
            return "email";
        }
        if (
            fieldTypeConfig.phoneFields.some((keyword) =>
                key.toLowerCase().includes(keyword)
            )
        ) {
            return "tel";
        }
        return "text";
    };

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            contract_id: props.contract.contract_id,
            client_name: props.contract.client_name,
            start_date: props.contract.start_date,
            end_date: props.contract.end_date,
            status: props.contract.status,
            contract_value: String(props.contract.contract_value),
        },
    });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        values.status = value;
        await axios.put(`/api/contract/${values.contract_id}`, values, {
            headers: { "content-type": "application/json" },
        });
        fetchData();
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <FileEdit />
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when
                        you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            {Object.keys(props.contract).map((fieldName) => {
                                return (
                                    <FormField
                                        key={fieldName}
                                        control={form.control}
                                        name={
                                            fieldName as keyof typeof props.contract
                                        }
                                        render={({ field }) => (
                                            <FormItem>
                                                <div className="grid grid-cols-4 items-center gap-4">
                                                    <FormLabel
                                                        htmlFor={fieldName}
                                                        className="text-right"
                                                    >
                                                        {formatSnakeToTitleCase(
                                                            fieldName
                                                        )}
                                                    </FormLabel>
                                                    <FormControl>
                                                        {fieldName !==
                                                        "status" ? (
                                                            <Input
                                                                type={getInputType(
                                                                    fieldName
                                                                )}
                                                                id={fieldName}
                                                                {...field}
                                                                disabled={
                                                                    fieldName ==
                                                                    "contract_id"
                                                                        ? true
                                                                        : false
                                                                }
                                                                className={`col-span-3 ${
                                                                    fieldName ==
                                                                    "contract_id"
                                                                        ? "cursor-not-allowed"
                                                                        : ""
                                                                }`}
                                                            />
                                                        ) : (
                                                            <CustomSelect
                                                                open={open}
                                                                setOpen={
                                                                    setOpen
                                                                }
                                                                value={value}
                                                                setValue={
                                                                    setValue
                                                                }
                                                                status={status}
                                                            ></CustomSelect>
                                                        )}
                                                    </FormControl>
                                                    <FormMessage className="col-span-4" />
                                                </div>
                                            </FormItem>
                                        )}
                                    />
                                );
                            })}
                            <Button type="submit">Submit</Button>
                        </form>
                    </Form>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default ModalForm;
