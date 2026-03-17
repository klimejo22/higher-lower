import { useState } from "react";
import { useNavigate } from "react-router";
export function SignUp() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("https://www.junglediff.cz/higher-lower-api/signUp.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      

      const data = await response.json();
      if (!response.ok) {
        setError(data.error)
        return 
      }
      console.log("Logged in:", data);
      localStorage.setItem("token", data.token)
      navigate("/")

    } catch (err) {
      setError("An error occured");
      console.log(err)
    }
  };

  return (
   <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.header}>Sign up</h2>

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
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Sign up
        </button>
      </form>
      <button style={styles.signupButton} onClick={() => navigate("/login")}>
        Already have an account? Log in.
      </button>
      
    </div>
  );
}

// ChatGPT
const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
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
  signupButton: {
    marginTop: "15px",
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "#10b981",
    color: "white",
    cursor: "pointer",
    width: "300px"
  },
  error: {
    color: "red",
    fontSize: "14px"
  }
};