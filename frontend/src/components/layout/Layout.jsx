import Sidebar from "./Sidebar";

export default function Layout({ children }) {
    return (
        <div style={{ display: "flex", minHeight: "100vh" }}>
            <Sidebar />
            <main style={{ flex: 1, minWidth:0, padding: 24 }}>{children}</main>
        </div>
    );
}