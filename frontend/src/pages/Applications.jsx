import { useEffect, useState, useMemo } from "react"; 
import { getApplications, addApplication, updateApplication } from "../api/jobApplications";

const STATUSES = ["Wishlist", "Applied", "Screening", "Interviewing", "Offer", "Rejected"];



export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    

    const handleCreate = async () => {
        const newApp = {
            companyName: "Frontend Test",
            roleTitle: "JAVA Developer",
            location: "Johannesburg",
            status: "Applied",
            salaryMin: 15000,
            salaryMax: 25000,
            notes: "Created from React",
            workType: "Onsite"
        };

        try {
            await addApplication(newApp);
            await fetchApplications(); // refresh board
        } catch (err) {
            console.error(err);
        }
    };

    const handleStatusChange = async (id, newStatus) => {
        try {
            await updateApplication(id, newStatus);
            await fetchApplications();
        } catch (err) {
            console.error(err);
        }
    };

    const fetchApplications = async () => {
        try {
            setLoading(true);
            const data = await getApplications();
            setApplications(data);
        } catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []); 

    // 1️ Sort first
    const sortedApplications = useMemo(() => {
        return [...applications].sort(
            (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
        );
    }, [applications]);

    // 2️ Then group
    const groupedApplications = useMemo(() => {
        return STATUSES.reduce((acc, status) => {
            acc[status] = sortedApplications.filter(
                app => app.status === status
            );
            return acc;
        }, {});
    }, [sortedApplications]);

    if (loading) return <p>Loading applications...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <h1>Job Applications</h1>

            <button onClick={handleCreate}>
                Test Add Application
            </button>

            {applications.length === 0 ? (
                <p>No applications found.</p>
            ) : (
                <div style={{ display: "flex", gap: "24px" }}>
                    {Object.entries(groupedApplications).map(([status, apps]) => (
                        <div key={status} style={{ flex: 1 }}>
                            <h2>
                                {status} ({apps.length})
                            </h2>

                            {apps.map(app => (
                                <div
                                    key={app.id}
                                    style={{
                                        marginBottom: 12,
                                        padding: 12,
                                        border: "1px solid #ddd",
                                        borderRadius: 8,
                                        background: "#fff"
                                    }}
                                >
                                    <h3 style={{ margin: "0 0 6px" }}>
                                        {app.roleTitle}
                                    </h3>

                                    <p style={{ margin: "0 0 4px" }}>
                                        {app.companyName}
                                    </p>

                                    <p style={{ margin: "0 0 4px" }}>
                                        {app.location}
                                    </p>

                                    <p style={{ margin: 0 }}>
                                        {new Date(app.dateApplied).toLocaleDateString()}
                                    </p>

                                    <button
                                        onClick={() => handleStatusChange(app.id, "Interviewing")}
                                    >
                                        Move to Interview
                                    </button>

                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
   