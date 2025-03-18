import { useEffect, useState } from "react";
import { generateClient } from "aws-amplify/data";
//import type { Schema } from "../amplify/data/resource";

const client = generateClient<any>();

function DoctorHome() {
  const [doctor, setDoctor] = useState<any["Doctor"]["type"] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDoctorData() {
      try {
        const response = await client.models.Doctor.list();
        if (response.data.length > 0) {
          setDoctor(response.data[0]); // Fetch the first (or only) doctor
        }
      } catch (error) {
        console.error("Error fetching doctor data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDoctorData();
  }, []);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Doctor Dashboard</h1>

      {loading ? (
        <p>Loading doctor data...</p>
      ) : doctor ? (
        <div
          style={{
            border: "1px solid black",
            padding: "20px",
            borderRadius: "10px",
            width: "80%",
            margin: "0 auto",
            backgroundColor: "white",
          }}
        >
          <h2>Dr. {doctor.name}</h2>
          <p><strong>Specialty:</strong> {doctor.specialty}</p>

          <h3>VHA Chat History:</h3>
          {doctor.vhaChats && doctor.vhaChats.length > 0 ? (
            <ul style={{ listStyle: "none", padding: "0" }}>
              {doctor.vhaChats.map((chat) => (
                <li
                  key={chat.id}
                  style={{
                    padding: "10px",
                    borderBottom: "1px solid #ccc",
                    textAlign: "left",
                  }}
                >
                  <strong>{new Date(chat.timestamp).toLocaleString()}:</strong> {chat.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No chat messages available.</p>
          )}
        </div>
      ) : (
        <p>No doctor data found.</p>
      )}
    </div>
  );
}

export default DoctorHome;
