// import { Link } from "react-router-dom";

// export default function Landing() {
//     return (
//         <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
//             <h1 className="text-4xl font-bold mb-4">HireIntel</h1>
//             <p className="text-gray-600 mb-6">
//                 Intelligent, Fair & Transparent AI-Powered Recruitment
//             </p>

//             <div className="flex gap-4">
//                 <Link
//                     to="/login"
//                     className="px-6 py-2 bg-indigo-600 text-white rounded-md"
//                 >
//                     Login
//                 </Link>
//                 <Link
//                     to="/signup"
//                     className="px-6 py-2 border rounded-md"
//                 >
//                     Sign Up
//                 </Link>
//             </div>
//         </div>
//     );
// }

import { Link } from "react-router-dom";

export default function Landing() {
    return (
        <div>
            <h1 className="text-center text-6xl font-bold">HireIntel</h1>
            <div className="flex justify-center gap-6 mt-10">
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </div>
    );
}
