import { useState } from "react";
import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://www.junglediff.cz/higher-lower-api/login.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          password
        })
      });

      if (!response.ok) {
        alert("Cannot login: Error code " + response.status)
      }

      const data = await response.json();
      console.log("Logged in:", data);

    } catch (err) {
      setError("Incorrect username or password");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.header}>Login</h2>

        {error && <p style={styles.error}>{error}</p>}
        
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Log in
        </button>
        <button style={styles.button}>Create Account</button>
      </form>
      
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6"
  },
  header: {
    color: "black",
  },
  form: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    width: "300px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    color: "black"
  },
  button: {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "#2563eb",
    color: "white",
    cursor: "pointer"
  },
  error: {
    color: "red",
    fontSize: "14px"
  }
};