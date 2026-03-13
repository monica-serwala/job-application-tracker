import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { addApplication } from "../api/jobApplications";

export default function CreateApplication() {
    const navigate = useNavigate();
    const { refreshApplications } = useOutletContext();

    const [formData, setFormData] = useState({
        companyName: "",
        roleTitle: "",
        status: 0,
        dateApplied: new Date().toISOString().split("T")[0],

        location: "",
        workType: 0,
        salaryMin: "",
        salaryMax: "",
        jobUrl: "",

        recruiterName: "",
        recruiterEmail: "",
        recruiterPhone: "",

        followUpDate: "",
        notes: ""
    });

    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async () => {
        try {
            setIsSaving(true);
            setError(null);

            const payload = {
                companyName: formData.companyName,
                roleTitle: formData.roleTitle,
                status: Number(formData.status),
                dateApplied: formData.dateApplied,

                location: formData.location,
                workType: Number(formData.workType),
                salaryMin: formData.salaryMin === "" ? null : Number(formData.salaryMin),
                salaryMax: formData.salaryMax === "" ? null : Number(formData.salaryMax),
                jobUrl: formData.jobUrl || null,

                recruiterName: formData.recruiterName || null,
                recruiterEmail: formData.recruiterEmail || null,
                recruiterPhone: formData.recruiterPhone || null,

                followUpDate: formData.followUpDate || null,
                notes: formData.notes || null
            };

            await addApplication(payload);
            await refreshApplications();
            navigate("/applications");
        } catch (err) {
            console.error(err);
            setError("Failed to create application");
        } finally {
            setIsSaving(false);
        }
    };

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
                    borderRadius: "12px"
                }}
                onClick={(e) => e.stopPropagation()}
            >
                <h2>Add New Application</h2>

                <div style={{ display: "grid", gap: 12 }}>
                    <div>
                        <strong>Company:</strong>
                        <input
                            value={formData.companyName}
                            onChange={(e) =>
                                setFormData({ ...formData, companyName: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Role Title:</strong>
                        <input
                            value={formData.roleTitle}
                            onChange={(e) =>
                                setFormData({ ...formData, roleTitle: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Location:</strong>
                        <input
                            value={formData.location}
                            onChange={(e) =>
                                setFormData({ ...formData, location: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Status:</strong>
                        <select
                            value={formData.status}
                            onChange={(e) =>
                                setFormData({ ...formData, status: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        >
                            <option value={0}>Wishlist</option>
                            <option value={1}>Applied</option>
                            <option value={2}>Screening</option>
                            <option value={3}>Interviewing</option>
                            <option value={4}>Offer</option>
                            <option value={5}>Rejected</option>
                        </select>
                    </div>

                    <div>
                        <strong>Date Applied:</strong>
                        <input
                            type="date"
                            value={formData.dateApplied}
                            onChange={(e) =>
                                setFormData({ ...formData, dateApplied: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Work Type:</strong>
                        <select
                            value={formData.workType}
                            onChange={(e) =>
                                setFormData({ ...formData, workType: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        >
                            <option value={0}>Remote</option>
                            <option value={1}>Hybrid</option>
                            <option value={2}>Onsite</option>
                        </select>
                    </div>

                    <div>
                        <strong>Salary Min:</strong>
                        <input
                            type="number"
                            value={formData.salaryMin}
                            onChange={(e) =>
                                setFormData({ ...formData, salaryMin: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Salary Max:</strong>
                        <input
                            type="number"
                            value={formData.salaryMax}
                            onChange={(e) =>
                                setFormData({ ...formData, salaryMax: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Job URL:</strong>
                        <input
                            value={formData.jobUrl}
                            onChange={(e) =>
                                setFormData({ ...formData, jobUrl: e.target.value })
                            }
                            style={{ marginLeft: 10, width: "70%" }}
                        />
                    </div>

                    <div>
                        <strong>Recruiter Name:</strong>
                        <input
                            value={formData.recruiterName}
                            onChange={(e) =>
                                setFormData({ ...formData, recruiterName: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Recruiter Email:</strong>
                        <input
                            type="email"
                            value={formData.recruiterEmail}
                            onChange={(e) =>
                                setFormData({ ...formData, recruiterEmail: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Recruiter Phone:</strong>
                        <input
                            value={formData.recruiterPhone}
                            onChange={(e) =>
                                setFormData({ ...formData, recruiterPhone: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Follow Up Date:</strong>
                        <input
                            type="date"
                            value={formData.followUpDate}
                            onChange={(e) =>
                                setFormData({ ...formData, followUpDate: e.target.value })
                            }
                            style={{ marginLeft: 10 }}
                        />
                    </div>

                    <div>
                        <strong>Notes:</strong>
                        <textarea
                            value={formData.notes}
                            onChange={(e) =>
                                setFormData({ ...formData, notes: e.target.value })
                            }
                            style={{ display: "block", width: "100%", marginTop: 6 }}
                        />
                    </div>

                    {error && (
                        <p style={{ color: "red", margin: 0 }}>{error}</p>
                    )}
                </div>

                <div style={{ marginTop: 20, display: "flex", gap: 10 }}>
                    <button
                        onClick={handleSubmit}
                        disabled={isSaving}
                        style={{
                            backgroundColor: "black",
                            color: "white",
                            padding: "8px 12px",
                            borderRadius: 6,
                            border: "none"
                        }}
                    >
                        {isSaving ? "Saving..." : "Create"}
                    </button>

                    <button onClick={() => navigate("/applications")}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
}