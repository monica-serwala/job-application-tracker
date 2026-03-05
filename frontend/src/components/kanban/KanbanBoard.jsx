import { DndContext } from "@dnd-kit/core";
import KanbanColumn from "./KanbanColumn";
import { updateApplicationStatus } from "../../api/jobApplications";

export default function KanbanBoard({ groupedApplications, setApplications }) {

    async function handleDragEnd(event) {

        const { active, over } = event;

        if (!over) return;

        const applicationId = active.id;
        const newStatus = over.id;

        setApplications(prev =>
            prev.map(app =>
                app.id === applicationId
                    ? { ...app, status: newStatus }
                    : app
            )
        );

        try {
            await updateApplicationStatus(applicationId, newStatus);
        } catch (err) {
            console.error("Failed to update status", err);
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div
                style={{
                    display: "flex",
                    gap: "24px",
                    alignItems: "flex-start",
                    overflowX: "auto"
                }}
            >
                {Object.entries(groupedApplications).map(([status, apps]) => (
                    <KanbanColumn
                        key={status}
                        status={status}
                        apps={apps}
                    />
                ))}
            </div>
        </DndContext>
    );
}