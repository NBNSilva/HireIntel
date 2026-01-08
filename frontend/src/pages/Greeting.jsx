export default function ThankYou() {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="bg-white p-10 rounded-xl shadow text-center">
                <h2 className="text-2xl font-bold text-green-600">
                    Thank You!
                </h2>
                <p className="mt-4 text-gray-600">
                    Your application has been submitted successfully.
                    We will notify you if you are shortlisted.
                </p>
            </div>
        </div>
    );
}
