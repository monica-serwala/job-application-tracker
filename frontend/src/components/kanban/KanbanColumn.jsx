import { useDroppable } from "@dnd-kit/core";
import KanbanCard from "./KanbanCard";

export default function KanbanColumn({ status, apps }) {

    const { setNodeRef } = useDroppable({
        id: status
    });

    return (
        <div
            ref={setNodeRef}
            style={{
                flex: "1",
                minWidth: "180px",
                minHeight: "300px",
                padding: 8,
                background: "#f7f7f7",
                borderRadius: 8
            }}
        >
            <h2>
                {status} ({apps.length})
            </h2>

            {apps.map(app => (
                <KanbanCard
                    key={app.id}
                    app={app}
                />
            ))}
        </div>
    );
}