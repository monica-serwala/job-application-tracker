import { useNavigate } from "react-router-dom";

export default function CreateApplication() {

    const navigate = useNavigate();

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
                    padding: "24px",
                    borderRadius: "12px",
                    width: "500px"
                }}
                onClick={(e) => e.stopPropagation()}
            >

                <h2>Add New Application</h2>

                <p>This is where the form will go.</p>

                <button onClick={() => navigate("/applications")}>
                    Close
                </button>

            </div>
        </div>
    );
}