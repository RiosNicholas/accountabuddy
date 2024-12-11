import React, { useState } from "react";

const UserBio = () => {
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);

  const handleInputChange = (event) => {
    setBio(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setEditing(false);
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto", fontFamily: "Arial" }}>
      <h1>User Profile</h1>
      {!editing ? (
        <div>
          <p><strong>Bio:</strong> {bio || "No bio added yet."}</p>
          <button onClick={() => setEditing(true)} style={{ padding: "5px 10px", cursor: "pointer" }}>Edit Bio</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: "10px" }}>
            <textarea
              value={bio}
              onChange={handleInputChange}
              placeholder="Write your bio here..."
              rows="4"
              style={{ width: "100%", padding: "10px" }}
            ></textarea>
          </div>
          <button type="submit" style={{ padding: "5px 10px", cursor: "pointer" }}>Save</button>
          <button
            type="button"
            onClick={() => setEditing(false)}
            style={{ padding: "5px 10px", cursor: "pointer", marginLeft: "10px" }}
          >
            Cancel
          </button>
        </form>
      )}
    </div>
  );
};

export default UserBio;
