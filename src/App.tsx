import "./App.css";
import Dashboard from "./pages/Dashboard";
import { ThemeProvider } from "@/components/theme-provider";
import { ContractProvider } from "./components/ContractContextProvider";
import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider,
} from "react-router-dom";
import GenerateNewContract from "./pages/GenerateNewContract";

function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/">
                <Route path="" element={<Dashboard />} />
                <Route path="new-contract" element={<GenerateNewContract />} />
            </Route>
        )
    );

    return (
        <ContractProvider>
            <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </ContractProvider>
    );
}

export default App;
