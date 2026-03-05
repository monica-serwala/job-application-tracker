import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import Analytics from "./pages/Analytics";

import ApplicationDetails from "./pages/ApplicationDetails";
import CreateApplication from "./pages/CreateApplication";

export default function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/applications" element={<Applications />} >
                        <Route path="/applications/new" element={<CreateApplication />} />
                        <Route path="/applications/:id" element={<ApplicationDetails />} />
                    </Route>
                    <Route path="/analytics" element={<Analytics />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}
