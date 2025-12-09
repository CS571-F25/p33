import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Journal() {
  const [entries, setEntries] = useState([]);
  const [current, setCurrent] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("journalEntries")) || [];
    setEntries(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  function addEntry() {
    if (!current.trim()) return;

    if (editingIndex !== null) {
      const updated = [...entries];
      updated[editingIndex].text = current;
      updated[editingIndex].date = new Date().toLocaleString();
      setEntries(updated);
      setEditingIndex(null);
    } else {
      const newEntry = {
        text: current,
        date: new Date().toLocaleString(),
      };
      setEntries([newEntry, ...entries]);
    }

    setCurrent("");
  }

  function deleteEntry(index) {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
  }

  function editEntry(index) {
    setCurrent(entries[index].text);
    setEditingIndex(index);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  
  function goBack() {
        navigate("/Profile");
    }

  return (
    <div style={{ paddingTop: "80px", textAlign: "center" }}>
        <button
        onClick={goBack}
        style={{
          position: "absolute",
          top: "70px",
          left: "10px",
          background: "lightgray",
          color: "black",
          border: "1px solid gray",
          borderRadius: "8px",
          padding: "8px 12px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back
      </button>
      <h1>Journal</h1>

      <p style={{ maxWidth: "600px", margin: "0 auto 20px" }}>
        Reflect on your day, coffee adventures, or anything you like!
      </p>

      <div
  style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "20px"
  }}
>
  <textarea
    value={current}
    onChange={(e) => setCurrent(e.target.value)}
    placeholder="Write a journal entry..."
    style={{
      width: "90%",
      maxWidth: "600px",
      height: "150px",
      padding: "12px",
      fontSize: "16px",
      borderRadius: "10px",
      border: "1px solid #ccc",
      background: "white",
      color: "black"
    }}
  />

  <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
    <button
      onClick={addEntry}
      style={{
        padding: "10px 20px",
        background: "lightblue",
        color: "black",
        border: "1px solid gray",
        borderRadius: "8px",
        cursor: "pointer",
        fontSize: "16px",
      }}
    >
      {editingIndex !== null ? "Update Entry" : "Add Entry"}
    </button>

    {editingIndex !== null && (
      <button
        onClick={() => {
          setCurrent("");
          setEditingIndex(null);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        style={{
          padding: "10px 20px",
          background: "lightblue",
          color: "black",
          border: "1px solid gray",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Cancel
      </button>
    )}
  </div>
</div>



      {/* Journal Entries */}
      <div
        style={{
          marginTop: "40px",
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        {entries.length === 0 && (
          <p style={{ color: "#666" }}>No journal entries yet.</p>
        )}

        <div style={{paddingBottom: 40}}> 
        {entries.map((entry, index) => (
          <div
            key={index}
            style={{
              background: "#f7f7f7",
              padding: "15px",
              borderRadius: "10px",
              marginBottom: "15px",
              textAlign: "left",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              position: "relative",
            }}
          >
            <small style={{ fontSize: "13px", color: "#555" }}>
              {entry.date}
            </small>

            <p style={{ marginTop: "8px", fontSize: "16px" }}>{entry.text}</p>

            <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
              <button
                onClick={() => editEntry(index)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  background: "pink",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteEntry(index)}
                style={{
                  padding: "5px 10px",
                  borderRadius: "6px",
                  border: "1px solid gray",
                  background: "pink",
                  color: "black",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        </div>

      </div>
    </div>
  );
}
