"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const [newProject, setNewProject] = useState("");
  const [newMember, setNewMember] = useState({
    username: "",
    project: "",
    role: "",
    isLeader: false,
  });

  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
    isAdmin: false,
    score: 0,
  });

  useEffect(() => {
    // Get projects
    axios
      .get("http://127.0.0.1:5000/dashboard/getpro", { withCredentials: true })
      .then((res) => setProjects(res.data.projects))
      .catch((err) =>
        setError(err.response?.data?.message || "Failed to load projects")
      );

    // Get current user info
    axios
      .get("http://127.0.0.1:5000/auth/me", { withCredentials: true })
      .then((res) => setIsAdmin(res.data.isAdmin))
      .catch(() => setIsAdmin(false));
  }, []);

  const handleCreateProject = () => {
    axios
      .post(
        "http://127.0.0.1:5000/dashboard/createProject",
        { project_data_name: newProject },
        { withCredentials: true }
      )
      .then(() => {
        alert("Project created");
        setProjects((prev) => [...prev, newProject]);
        setNewProject("");
      })
      .catch((err) => {
        alert(err.response?.data?.msg || "Error creating project");
      });
  };

  const handleAddMember = () => {
    axios
      .post(
        "http://127.0.0.1:5000/dashboard/addMemberPro",
        {
          username: newMember.username,
          project_data_name: newMember.project,
          role: newMember.role,
          isLeader: newMember.isLeader,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("Member added");
        setNewMember({
          username: "",
          project: "",
          role: "",
          isLeader: false,
        });
      })
      .catch((err) => {
        alert(
          err.response?.data?.err ||
            err.response?.data?.msg ||
            "Error adding member"
        );
      });
  };

  const handleAddUser = () => {
    axios
      .post(
        "http://127.0.0.1:5000/auth/add_user",
        {
          username: newUser.username,
          email: newUser.email,
          password: newUser.password,
          isAdmin: newUser.isAdmin,
          score: newUser.score,
        },
        { withCredentials: true }
      )
      .then(() => {
        alert("User added");
        setNewUser({
          username: "",
          email: "",
          password: "",
          isAdmin: false,
          score: 0,
        });
      })
      .catch((err) => {
        alert(err.response?.data?.err || "Error adding user");
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {error && <p className="text-red-500">{error}</p>}

      <ul className="space-y-2 mb-6">
        {projects.map((project, idx) => (
          <li key={idx} className="text-black p-3 bg-gray-100 rounded-md shadow">
            {project}
          </li>
        ))}
      </ul>

      {isAdmin && (
        <div className="text-black space-y-6">
          {/* Create Project */}
          <div className="border p-4 rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Create New Project</h2>
            <input
              type="text"
              placeholder="Project name"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              className="border px-3 py-2 rounded w-full"
            />
            <button
              onClick={handleCreateProject}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded"
            >
              Create
            </button>
          </div>

          {/* Add Member */}
          <div className="border p-4 rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Add Member to Project</h2>
            <input
              type="text"
              placeholder="Username"
              value={newMember.username}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  username: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <select
              value={newMember.project}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  project: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            >
              <option value="">Select a project</option>
              {projects.map((proj) => (
                <option key={proj} value={proj}>
                  {proj}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Role"
              value={newMember.role}
              onChange={(e) =>
                setNewMember((prev) => ({
                  ...prev,
                  role: e.target.value,
                }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newMember.isLeader}
                onChange={(e) =>
                  setNewMember((prev) => ({
                    ...prev,
                    isLeader: e.target.checked,
                  }))
                }
              />
              <span>Is Leader?</span>
            </label>
            <button
              onClick={handleAddMember}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded"
            >
              Add Member
            </button>
          </div>

          <div className="border p-4 rounded-md bg-gray-50">
            <h2 className="text-lg font-semibold mb-2">Add New User</h2>
            <input
              type="text"
              placeholder="Username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, username: e.target.value }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, email: e.target.value }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, password: e.target.value }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <input
              type="number"
              placeholder="Score"
              value={newUser.score}
              onChange={(e) =>
                setNewUser((prev) => ({ ...prev, score: e.target.value }))
              }
              className="border px-3 py-2 rounded w-full mb-2"
            />
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={newUser.isAdmin}
                onChange={(e) =>
                  setNewUser((prev) => ({
                    ...prev,
                    isAdmin: e.target.checked,
                  }))
                }
              />
              <span>Admin?</span>
            </label>
            <button
              onClick={handleAddUser}
              className="mt-2 bg-purple-600 text-white px-4 py-2 rounded"
            >
              Add User
            </button>
          </div>
        </div>
        
      )}
      
    </div>
  );
}
