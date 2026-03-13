 const API_BASE = "https://localhost:7062/api/JobApplications";

    export async function getApplications() {
        const response = await fetch(API_BASE);
        if (!response.ok) {
            throw new Error("Failed to fetch job applications");
        }
        return await response.json();
    }

    export async function addApplication(application) {
        const response = await fetch(API_BASE, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(application),
        });
        if (!response.ok) {
            throw new Error("Failed to add job application");
        }
        return await response.json();
    }

    export async function updateApplicationStatus(id, status) {
        const response = await fetch(`${API_BASE}/${id}/status`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status }),
        });
        if (!response.ok) {
            throw new Error("Failed to update job application");
        }
        return await response.json();
    }

    export async function getApplicationById(id) {
        const response = await fetch(`${API_BASE}/${id}`);

        if (!response.ok) {
            throw new Error("Failed to fetch application");
        }

        return await response.json();
    }

    export async function deleteApplication(id) {
        const response = await fetch(`${API_BASE}/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) {
            throw new Error("Failed to delete application");
        }
}

export async function updateApplication(id, data) {
    const response = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error("Failed to update job application");
    }

    return await response.json();
}

export async function getDashboard() {
    const response = await fetch("https://localhost:7062/api/dashboard");

    if (!response.ok) {
        throw new Error("Failed to fetch dashboard data");
    }

    return await response.json();
}
