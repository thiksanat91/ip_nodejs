
import { useState } from "react";
import "./App.css";

function App() {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");

  return (
    <div className="app">
      <header className="header">
        <h1>Department Notice Board</h1>
        <p>Stay updated with the latest department announcements.</p>
      </header>

      <main className="container">
        <section className="form-section">
          <h2>Add New Notice</h2>

          <form onSubmit={async (e) => {
            e.preventDefault();

            try {
              const response = await fetch(
                "http://localhost:3000/api/notices",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({ title, message })
                }
              );

              if (!response.ok) {
                throw new Error("Unable to save notice");
              }

              alert("Notice added successfully!");
              setTitle("");
              setMessage("");
            } catch {
              alert("Cannot connect to server. Check that your backend is running.");
            }
          }}>
            <label>Notice Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter notice title"
            />

            <label>Notice Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter notice message"
            />

            <button type="submit">Add Notice</button>
          </form>
        </section>

        <section className="latest">
          <h2>Latest Notices</h2>
          <p>Department announcements will appear here.</p>
        </section>
      </main>

      <footer>© 2026 Department Notice Board</footer>
    </div>
  );
}

export default App;
