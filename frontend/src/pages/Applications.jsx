import { useEffect, useState, useMemo } from "react"; 
import { getApplications } from "../api/jobApplications";
import { Outlet, useNavigate } from "react-router-dom";
import KanbanBoard from "../components/kanban/KanbanBoard";

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

    // Filter applications
    const filteredApplications = useMemo(() => {
        return applications.filter(app =>
            app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.roleTitle.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [applications, searchTerm]);

    // Sort applications by most recent
    const sortedApplications = useMemo(() => {
        return [...filteredApplications].sort(
            (a, b) => new Date(b.dateApplied) - new Date(a.dateApplied)
        );
    }, [filteredApplications]);

    // Group applications by status
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
                    onClick={() => navigate("/applications/new")}
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
                        
                        <KanbanBoard
                            groupedApplications={groupedApplications}
                            setApplications={setApplications}
                        />
                     )}           
                    
   
                 
            <Outlet context={{ refreshApplications: fetchApplications }} />
        </div>
    );
}
   