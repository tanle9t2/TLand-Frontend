import { ClipLoader } from "react-spinners";

function MiniSpinner({ size = 20, color = "#e11d48" }) {
    return (
        <div className="inline-flex items-center justify-center">
            <ClipLoader size={size} color={color} speedMultiplier={0.85} />
        </div>
    );
}

export default MiniSpinner;
