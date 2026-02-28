import { useEffect, useState, useMemo } from "react"; 
import { getApplications } from "../api/jobApplications";

export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    useEffect(() => {
        async function fetchData() {
            try {
                const data = await getApplications();
                setApplications(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);


    const sortedApplications = useMemo(() => {
        return [...applications].sort((a, b) => new Date(b.dateApplied) - new Date(a.dateApplied));
    }, [applications]);
    if (loading) return <p>Loading applications...</p>;
    if (error) return <p>Error: {error}</p>;
    return (
        <div>
            <h1>Job Applications</h1>
            {sortedApplications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {sortedApplications.map(app => (
                        <li key={app.id} style={{ marginBottom: 16, padding: 12, border: "1px solid #eee", borderRadius: 8 }}>
                            <h2 style={{ margin: "0 0 8px" }}>{app.position} at {app.company}</h2>
                            <p style={{ margin: "0 0 4px" }}>Applied on: {new Date(app.dateApplied).toLocaleDateString()}</p>
                            <p style={{ margin: 0 }}>Status: {app.status}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}