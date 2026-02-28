const API_BASE = "https://localhost:7062/api/JobApplications";

export async function getApplications() {
    const response = await fetch(API_BASE);
    if (!response.ok) {
        throw new Error("Failed to fetch job applications");
    }
    return await response.json();
}