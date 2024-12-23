import { columns } from "./Columns";
import { DataTable } from "./data-table";
import { useContractContext } from "@/components/ContractContextProvider";

function Dashboard() {
    const { data } = useContractContext();

    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={data} />
        </div>
    );
}

export default Dashboard;
