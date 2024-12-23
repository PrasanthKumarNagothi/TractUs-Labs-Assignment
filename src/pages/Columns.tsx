"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ArrowUpDown, ClipboardCopy } from "lucide-react";
import ModalForm from "@/components/ModalForm";
import DeleteContract from "@/components/DeleteContract";

export type Contract = {
    contract_id: string;
    client_name: string;
    start_date: string;
    end_date: string;
    status: "active" | "terminated" | "completed";
    contract_value: number;
};

export const columns: ColumnDef<Contract>[] = [
    {
        accessorKey: "client_name",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Client Name
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "start_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    Start Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "end_date",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() === "asc")
                    }
                >
                    End Date
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
            <div className="first-letter:uppercase">
                {row.getValue("status")}
            </div>
        ),
    },
    {
        accessorKey: "contract_value",
        header: ({ column }) => {
            return (
                <div className="text-center">
                    <Button
                        variant="ghost"
                        onClick={() =>
                            column.toggleSorting(column.getIsSorted() === "asc")
                        }
                    >
                        Contract Value
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            );
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("contract_value"));
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount);

            return <div className="text-center font-medium">{formatted}</div>;
        },
    },
    {
        header: () => <div className="text-center">Actions</div>,
        id: "actions",
        cell: ({ row }) => {
            const contract = row.original;

            return (
                <div className="text-center flex items-center space-x-2">
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger
                                onClick={() =>
                                    navigator.clipboard.writeText(
                                        contract.contract_id
                                    )
                                }
                            >
                                <ClipboardCopy />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Copy the Contract ID</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                    <ModalForm contract={contract}></ModalForm>
                    <DeleteContract
                        contract_id={contract.contract_id}
                    ></DeleteContract>
                </div>
            );
        },
    },
];
