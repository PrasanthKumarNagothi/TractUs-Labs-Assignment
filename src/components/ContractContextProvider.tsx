import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from "react";
import axios from "axios";

type ContractContextType = {
    data:
        | {
              contract_id: string;
              client_name: string;
              start_date: string;
              end_date: string;
              status: string;
              contract_value: number;
          }
        | undefined;
    fetchData: () => void;
    loading: boolean;
    error: string | null;
};

const ContractContext = createContext<ContractContextType | undefined>(
    undefined
);

export const ContractProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [data, setData] = useState<ContractContextType["data"]>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get("/api/contract");
            setData(await response.data);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <ContractContext.Provider value={{ data, fetchData, loading, error }}>
            {loading ? <div>Loading...</div> : children}
        </ContractContext.Provider>
    );
};

export const useContractContext = () => {
    const context = useContext(ContractContext);
    if (!context) {
        throw new Error(
            "useContractContext must be used within a DataProvider"
        );
    }
    return context;
};
