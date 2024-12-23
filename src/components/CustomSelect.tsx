"use client";

import { cn } from "@/lib/utils";
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
import { Button } from "./ui/button";
import { Check, ChevronsUpDown } from "lucide-react";

function CustomSelect(props: {
    open: boolean;
    setOpen: (open: boolean) => void;
    value: string;
    status: { value: string; label: string }[];
    setValue: (arg0: string) => void;
}) {
    return (
        <Popover open={props.open} onOpenChange={props.setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={props.open}
                    className="min-w-max justify-between"
                >
                    {props.value
                        ? props.status.find(
                              (status) => status.value === props.value
                          )?.label
                        : "Select status..."}
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandList>
                        <CommandEmpty>No status found.</CommandEmpty>
                        <CommandGroup>
                            {props.status.map((status) => (
                                <CommandItem
                                    key={status.value}
                                    value={status.value}
                                    onSelect={(currentValue) => {
                                        props.setValue(
                                            currentValue === props.value
                                                ? ""
                                                : currentValue
                                        );
                                        props.setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            props.value === status.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                    {status.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

export default CustomSelect;
