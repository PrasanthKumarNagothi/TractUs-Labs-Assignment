import axios from "axios";
import { Trash2 } from "lucide-react";
import {
    AlertDialog,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { useState } from "react";
import { useContractContext } from "@/components/ContractContextProvider";

function DeleteContract({ contract_id }: { contract_id: string }) {
    const { fetchData } = useContractContext();

    const deleteContract = async () => {
        await axios.delete(
            `https://6762644f46efb37323746876.mockapi.io/api/contract/${contract_id}`
        );
        fetchData();
    };

    const [isOpen, setIsOpen] = useState(false);

    const openDialog = () => {
        setIsOpen(true);
    };

    const closeDialog = () => {
        setIsOpen(false);
    };

    return (
        <>
            <Trash2 onClick={() => openDialog()} />
            <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>
                            Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your contract and remove your data from our
                            servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={closeDialog}>
                            Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={() => deleteContract()}>
                            Continue
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}

export default DeleteContract;
