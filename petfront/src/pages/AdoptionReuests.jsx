import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import placeholder from "../components/assets/placeholder.png";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const apiUrl = process.env.REACT_APP_API_URL;

const AdoptionRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("All"); // Add state for filter
 const fetchRequests = async () => {
   try {
     const response = await fetch(`${apiUrl}/request/all`);
     if (!response.ok) {
       throw new Error("Failed to fetch adoption requests");
     }
     const data = await response.json();
     setRequests(data);
   } catch (err) {
     setError(err.message);
   } finally {
     setLoading(false);
   }
 };
  useEffect(() => {

    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/request/approve/${requestId}`, {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Approved");

    fetchRequests();
      }
    } catch (err) {
      setError("Error approving request: " + err.message);
    }
  };

  const handleDeny = async (requestId) => {
    try {
      const response = await fetch(`${apiUrl}/request/deny/${requestId}`, {
        method: "POST",
      });
      if (response.ok) {
        toast.success("Denied")

    fetchRequests();
      }
    } catch (err) {
      setError("Error denying request: " + err.message);
    }
  };

  // Filter requests based on selected status
  const filteredRequests =
    filter === "All"
      ? requests
      : requests.filter((req) => req.status === filter);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="adoption-requests">
      <h1 className="title">Adoption Requests</h1>

      {/* Filter Section */}
      <div className="filter-options">
        <label>Filter by Status: </label>
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Denied">Denied</option>
        </select>
      </div>

      {filteredRequests.length === 0 ? (
        <p className="no-requests">No adoption requests available.</p>
      ) : (
        <ul className="request-list">
          {filteredRequests.map((request) => (
            <li key={request._id} className="request-item">
              <div className="request-frame">
                <img
                  src={
                    request.pet && request.pet.image
                      ? `${apiUrl}/${request.pet.image}`
                      : placeholder
                  }
                  alt="Pet"
                  className="requestImg"
                />
                <div className="request-info">
                  <strong>User: </strong>
                  {request.user.username}
                  <br />
                  <strong>Email: </strong>
                  {request.user.email}
                  <br />
                  <strong>Pet: </strong>
                  {request.pet ? request.pet.name : "Unknown Pet"}
                  <br />
                  <strong>Breed: </strong>
                  {request.pet ? request.pet.breed : "Unknown Breed"}
                  <br />
                  <strong>Age: </strong>
                  {request.pet ? request.pet.age : "Unknown Age"}
                  <br />
                  <strong>Status: </strong>
                  {request.status}
                  <br />
                  <strong>Created At: </strong>
                  {new Date(request.createdAt).toLocaleString()}
                </div>
                <div className="button-group">
                  <button
                    onClick={() => handleApprove(request._id)}
                    className="approve-button"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDeny(request._id)}
                    className="deny-button"
                  >
                    Deny
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdoptionRequests;
