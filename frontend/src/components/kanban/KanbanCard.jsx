import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDraggable } from "@dnd-kit/core";
import { Pencil } from "lucide-react";

export default function KanbanCard({ app }) {

    const navigate = useNavigate();
    const [hover, setHover] = useState(false);

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: app.id
    });

    const style = {
        position: "relative",
        marginBottom: 12,
        padding: 12,
        border: "1px solid #ddd",
        borderRadius: 8,
        background: "#fff",
        cursor: hover ? "grab" : "default",
        boxShadow: hover ? "0 2px 6px rgba(0,0,0,0.1)" : "none",
        transition: "box-shadow 0.15s ease",
        transform: transform
            ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
            : undefined
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >

            {/* EDIT BUTTON */}
            {hover && (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        navigate(`/applications/${app.id}`);
                    }}
                    style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        border: "none",
                        background: "white",
                        borderRadius: "50%",
                        padding: 4,
                        cursor: "pointer",
                        pointerEvents: "auto"
                    }}
                >
                    <Pencil size={16} />
                </button>
            )}

            {/* DRAG AREA */}
            <div
                {...listeners}
                {...attributes}
                style={{ cursor: "grab" }}
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

        </div>
    );
}