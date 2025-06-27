// frontend ProjectPage.js
"use client";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import axios from "axios";

export default function ProjectPage() {
    const pathname = usePathname(); // e.g. /dashboard/project/3
    const proId = pathname.split("/").pop();

    const [info, setInfo] = useState(null);
    const [updates, setUpdates] = useState([]);
    const [userRole, setUserRole] = useState({
        isAdmin: false,
        isLeader: false,
        isMember: false,
    });
    const [error, setError] = useState("");

    useEffect(() => {
        async function load() {
            try {
                const me = await axios.get("http://127.0.0.1:5000/auth/me", {
                    withCredentials: true,
                });
                const { isAdmin, username } = me.data;

                // Load project info
                const pi = await axios.get(
                    `http://127.0.0.1:5000/dashboard/getproinfo/${proId}`,
                    { withCredentials: true }
                );

                const { leaders, devs, ...rest } = pi.data;

                const leaderNames = leaders.map((r) => r.username);
                const devNames = devs.map((r) => r.username);

                const isLeader = leaderNames.includes(username);
                const isMember = devNames.includes(username);

                setUserRole({ isAdmin, isLeader, isMember });
                setInfo({ ...rest, leaders, devs });

                // Fetch ALL updates from the single, improved /dashboard/getupdates endpoint
                const resUpdates = await axios.get("http://127.0.0.1:5000/dashboard/getupdates", {
                    withCredentials: true,
                    params: { project_data_name: rest.name },
                });

                const fetchedUpdates = resUpdates.data.data || [];

                // Map the fetched data directly to the updates state
                // Use the 'approved' and 'percentage' directly from the backend response
                const formattedUpdates = fetchedUpdates.map(u => ({
                    // Create a unique frontend ID by prefixing with 'a-' or 'p-'
                    // and then using the backend's numeric ID (u.id)
                    id: u.approved ? `a-${u.id}` : `p-${u.id}`,
                    username: u.username,
                    desc: u.update_desc, // Use the correct field name from backend
                    approved: u.approved, // Use the boolean value directly from backend
                    percentage: u.percentage // Use the percentage value directly from backend
                }));

                setUpdates(formattedUpdates);

            } catch (e) {
                console.error("Error loading project data or updates:", e);
                setError("Could not load project data or updates");
            }
        }

        load();
    }, [proId]);

    const handleApproveProject = async () => {
        try {
            await axios.put(
                "http://127.0.0.1:5000/dashboard/approveProject",
                { project_data_name: info.name },
                { withCredentials: true }
            );
            alert("Project approved");
            window.location.reload();
        } catch (e) {
            console.error("Error approving project:", e);
            alert("Failed to approve project");
        }
    };

    const handleApproveUpdate = async (update) => {
        try {
            await axios.put(
                "http://127.0.0.1:5000/dashboard/approveUpdate",
                {
                    project_data_name: info.name,
                    // When sending the ID back, strip the 'a-' or 'p-' prefix
                    // to send only the numeric ID that the backend expects.
                    id: update.id.split("-")[1],
                },
                { withCredentials: true }
            );
            alert("Update approved");
            window.location.reload();
        } catch (e) {
            console.error("Error approving update:", e);
            alert("Failed to approve update");
        }
    };

    if (error) return <p className="text-red-500">{error}</p>;
    if (!info) return <p>Loading project info...</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{info.name}</h1>
            <p>Progress: {info.progress}%</p>
            <p>Approved: {info.approved ? "Yes" : "No"}</p>

            <div className="mt-4 mb-6">
                <h2 className="font-semibold">Leaders:</h2>
                <ul>{info.leaders.map((u) => <li key={u.username}>{u.username}</li>)}</ul>
                <h2 className="font-semibold mt-2">Members:</h2>
                <ul>{info.devs.map((u) => <li key={u.username}>{u.username}</li>)}</ul>
            </div>

            <h2 className="text-xl font-bold mt-6">Updates</h2>
            <ul className="space-y-2">
                {updates.map((u) => (
                    <li key={u.id} className="border p-2 rounded">
                        <p>{u.username}</p>
                        <p className="font-bold">{u.desc}</p> {/* Now correctly displays desc */}
                        <p>Progress: {u.percentage}%</p> {/* Now correctly displays percentage */}
                        <p>Approved: {u.approved ? "Yes" : "No"}</p> {/* Now correctly displays boolean */}

                        {!u.approved && (userRole.isLeader || userRole.isAdmin) && (
                            <button
                                onClick={() => handleApproveUpdate(u)}
                                className="mt-2 bg-green-600 text-white px-3 py-1 rounded"
                            >
                                Approve Update
                            </button>
                        )}
                    </li>
                ))}
            </ul>

            <div className="my-4">
                <h2 className="text-lg font-bold mb-2">Submit an Update</h2>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const update = e.target.update.value;
                        const percentage = parseInt(e.target.percentage.value, 10);

                        try {
                            await axios.post(
                                "http://127.0.0.1:5000/dashboard/postUpdate",
                                {
                                    project_data_name: info.name,
                                    update, // This maps to update_desc on backend
                                    percentage,
                                },
                                { withCredentials: true }
                            );
                            alert("Update posted");
                            window.location.reload();
                        } catch (err) {
                            console.error("Error posting update:", err);
                            alert("Failed to post update");
                        }
                    }}
                    className="space-y-3"
                >
                    <textarea
                        name="update"
                        placeholder="Describe your update"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <input
                        type="number"
                        name="percentage"
                        placeholder="Progress %"
                        min="0"
                        max="100"
                        className="w-full border p-2 rounded"
                        required
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded"
                    >
                        Submit Update
                    </button>
                </form>
            </div>

            {!info.approved && userRole.isAdmin && (
                <button
                    onClick={handleApproveProject}
                    className="mt-6 bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Approve Project
                </button>
            )}
        </div>
    );
}