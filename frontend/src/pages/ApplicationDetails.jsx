//Reads an id from the URL
//Fetches a single job application from your API
//Displays it in a full - screen overlay
//Allows closing back to / applications

import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import * as Api from "../api/jobApplications";
import { Pencil, Check, X } from "lucide-react";

export default function ApplicationDetails() {
    console.log("DETAILS COMPONENT UPDATED");
    const { id } = useParams();
    const navigate = useNavigate();
    console.log("API exports:", Object.keys(Api));


    const [application, setApplication] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const data = await Api.getApplicationById(id);
                setApplication(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchApplication();
    }, [id]);

    const handleDelete = async () => {
        const ok = window.confirm("Delete this application? This cannot be undone.");
        if (!ok) return;

        try {
            await Api.deleteApplication(id);
            navigate("/applications");
        } catch (err) {
            console.error(err);
            alert("Failed to delete application");
        }
    };

    const handleSave = async () => {
        try {
            setIsSaving(true);

            const updatePayload = {
                companyName: formData.companyName,
                roleTitle: application.roleTitle,
                location: formData.location,
                status: application.status,
                dateApplied: application.dateApplied,
                salaryMin: application.salaryMin,
                salaryMax: application.salaryMax,
                notes: formData.notes,
                jobUrl: application.jobUrl,
                workType: formData.workType
            };

            const updated = await Api.updateApplication(id, updatePayload);

            setApplication(updated);
            setIsEditing(false);
        } catch (err) {
            console.error(err);
            alert("Failed to update");
        } finally {
            setIsSaving(false);
        }
    };
    

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error...</p>;
    if (!application) return null;

    return (
        <div


            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
                backgroundColor: "rgba(0,0,0,0.5)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000
            }}
            onClick={() => navigate("/applications")}
        >
            <div
                style={{
                    background: "white",
                    width: "700px",
                    maxWidth: "90vw",
                    maxHeight: "85vh",         
                    overflowY: "auto",          
                    padding: "24px",
                    borderRadius: "12px",
                    position: "relative",
                }}
                onClick={(e) => e.stopPropagation()}>

                <div style={{ position: "absolute", top: 16, right: 16 }}>
                    {!isEditing ? (
                        <div
                            style={{
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 36,
                                height: 36,
                                borderRadius: 8,
                                background: "transparent"
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.background = "#f2f2f2"}
                            onMouseLeave={(e) => e.currentTarget.style.background = "transparent"}
                            onClick={() => {
                                setFormData(application);
                                setIsEditing(true);
                            }}
                        >
                            <Pencil size={20} />
                        </div>
                    ) : (
                        <div style={{ display: "flex", gap: 12 }}>
                            <Check
                                size={20}
                                    style={{
                                        cursor: isSaving ? "not-allowed" : "pointer",
                                        opacity: isSaving ? 0.5 : 1
                                    }}
                                onClick={handleSave}
                            />
                            <X
                                size={20}
                                style={{ cursor: "pointer" }}
                                onClick={() => setIsEditing(false)}
                            />
                        </div>
                    )}
                </div>

                <h2 style={{ marginBottom: 16 }}>{application.roleTitle}</h2>

                <div style={{ display: "grid", gap: 8 }}>

                    <div>
                        <strong>Company:</strong>
                        {isEditing ? (
                            <input
                                value={formData?.companyName || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, companyName: e.target.value })
                                }
                                style={{ marginLeft: 10 }}
                            />
                        ) : (
                            <span> {application.companyName}</span>
                        )}
                    </div>

                    <div>
                        <strong>Location:</strong>
                        {isEditing ? (
                            <input
                                value={formData.location}
                                onChange={(e) =>
                                    setFormData({ ...formData, location: e.target.value })
                                }
                                style={{ marginLeft: 10 }}
                            />
                        ) : (
                            <span> {application.location}</span>
                        )}
                    </div>

                    <div>
                        <strong>Work Type:</strong>
                        {isEditing ? (
                            <select
                                value={formData.workType}
                                onChange={(e) =>
                                    setFormData({ ...formData, workType: e.target.value })
                                }
                                style={{ marginLeft: 10 }}
                            >
                                <option value="Remote">Remote</option>
                                <option value="Hybrid">Hybrid</option>
                                <option value="On-site">On-site</option>
                            </select>
                        ) : (
                            <span> {application.workType}</span>
                        )}
                    </div>

                   


                    <p>
                        <strong>Date Applied:</strong>{" "}
                        {new Date(application.dateApplied).toLocaleDateString()}
                    </p>

                    <p>
                        <strong>Salary Range:</strong>{" "}
                        {application.salaryMin && application.salaryMax
                            ? `R${application.salaryMin} - R${application.salaryMax}`
                            : "Not specified"}
                    </p>

                    <p>
                        <strong>Job URL:</strong>{" "}
                        {application.jobUrl ? (
                            <a
                                href={application.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                View Posting
                            </a>
                        ) : (
                            "Not provided"
                        )}
                    </p>

                    <div>
                        <strong>Notes:</strong>
                        {isEditing ? (
                            <textarea
                                value={formData.notes || ""}
                                onChange={(e) =>
                                    setFormData({ ...formData, notes: e.target.value })
                                }
                                style={{ display: "block", width: "100%", marginTop: 6 }}
                            />
                        ) : (
                            <p>{application.notes || "No notes added"}</p>
                        )}
                    </div>

                    <hr />

                    <p style={{ fontSize: 12, color: "#777" }}>
                        Created: {new Date(application.createdAt).toLocaleString()}
                    </p>

                    <p style={{ fontSize: 12, color: "#777" }}>
                        Updated: {new Date(application.updatedAt).toLocaleString()}
                    </p>
                </div>

                <button
                    onClick={handleDelete}
                    style={{
                        backgroundColor: "red",
                        color: "white",
                        padding: "8px 12px",
                        borderRadius: 6,
                        border: "none",
                        marginTop: 12,
                        marginRight: 10
                    }}
                >
                    Delete
                </button>

                <button onClick={() => navigate("/applications")}>
                    Close
                </button>
            </div>
        </div>
    );
}