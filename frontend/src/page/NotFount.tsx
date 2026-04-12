import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <div className="text-center bg-card border border-border rounded-2xl p-8 shadow-sm max-w-md w-full">

                {/* 404 Number */}
                <h1 className="text-6xl font-bold text-primary">404</h1>

                {/* Title */}
                <h2 className="text-xl font-semibold text-text-primary mt-4">
                    Page Not Found
                </h2>

                {/* Description */}
                <p className="text-text-secondary mt-2">
                    The page you are looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex justify-center gap-3 mt-6">
                    <button
                        type="button"
                        onClick={() => navigate("/")}
                        className="bg-primary hover:bg-primary-light text-white px-5 py-2 rounded-lg transition"
                    >
                        Go Home
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="border border-border text-text-primary px-5 py-2 rounded-lg hover:bg-gray-100 transition"
                    >
                        Go Back
                    </button>
                </div>

            </div>
        </div>
    );
};

export default NotFound;