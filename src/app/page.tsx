import { redirect } from 'next/navigation';

export default function HomePage() {
    // If someone visits the root, redirect to a 404-style message
    // In production you might want a landing page or just show nothing
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-gray-900">
            <h1 className="text-3xl font-bold mb-4">GCU Proposals</h1>
            <p className="text-gray-500">Please use the proposal link provided to you.</p>
        </div>
    );
}
