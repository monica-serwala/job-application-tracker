import { useEffect, useState, useMemo } from "react"; 
import { getApplications } from "../api/jobApplications";
import { useNavigate, Outlet } from "react-router-dom";

const STATUSES = ["Wishlist", "Applied", "Screening", "Interviewing", "Offer", "Rejected"];


//component for applications page, which will display all the job applications in a board format, grouped by their status.
//It will also have a search bar to filter applications by company name or role title. 
//The applications will be sorted by date applied, with the most recent ones at the top. 
//Each application will be displayed as a card with its details. 
//The user can click on a card to view more details about the application.
export default function Applications() {
    const [applications, setApplications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState(null);
    
    const navigate = useNavigate(); 
    

    

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
    const filteredApplications = useMemo(() => {
        return applications.filter(app =>
            app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.roleTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [applications, searchTerm]);

    const sortedApplications = useMemo(() => {
        return [...filteredApplications].sort(
            (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
        );
    }, [filteredApplications]);

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
        <div >
            {/* HEADER SECTION */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 20
                }}>
                <div>
                    <h1 style={{ margin: 0 }}>Applications Board</h1>
                    <p style={{ margin: 0, color: "#666" }}>
                        {applications.length} total applications
                    </p>
                </div>

                <button
                    style={{
                        backgroundColor: "black",
                        color: "white",
                        padding: "10px 16px",
                        borderRadius: 8,
                        border: "none",
                        cursor: "pointer"
                    }}
                >
                    + Add Application
                </button>
            </div>

                {/* SEARCH BAR */}
                <div style={{ marginBottom: 20 }}>
                    <input
                        type="text"
                        placeholder="Search by company or position..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: "50%",
                            padding: "12px",
                            borderRadius: 8,
                            border: "1px solid #ccc"
                        }}
                    />
                </div>

                {/*check if there are application(card) available*/ }
                {applications.length === 0 ? (
                    <p>No applications found.</p>
                ) : (
                        <div style={{ display: "flex", gap: "24px", alignItems: "flex-start", overflowX: "auto" }}>
                            {/*columns*/ }
                            {Object.entries(groupedApplications).map(([status, apps]) => (
                                <div key={status} style={{ flex: "1", minWidth: "180px" }}>
                                <h2>
                                    {status} ({apps.length})
                                    </h2>

                                    {/*cards*/ }

                                {apps.map(app => (
                                    <div
                                        key={app.id}
                                        onClick={() => navigate(`/applications/${app.id}`)}
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

                                    

                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                 )}
            <Outlet />
        </div>
    );
}
   