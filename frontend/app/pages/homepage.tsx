import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

export function HomePage() {
    const navigate = useNavigate();
    const [personalBest, setPersonalBest] = useState<number>(0);
    const [user, setUser] = useState<string>("")
    const autenthicateUser = () => {
        const username = localStorage.getItem("username")
        if (!username) {
            navigate("/login");
            return;
        }

        setUser(username)
    }
    const getPB = async () => {
        try {
            const response = await fetch(
                "https://www.junglediff.cz/higher-lower-api/getPB.php?username=" + encodeURIComponent(user),
                {
                    method: "GET"
                }
            );     

            const data = await response.json();
            if (!response.ok) {
                alert("An error occured: " + data.error)
                console.log(data.error)
                return 
            }
            setPersonalBest(Number(data.personalBest));
        
        } catch (err) {
            alert("An error occured: " + err)
            console.log(err)
        }
    }
    useEffect(() => {
        autenthicateUser()
        getPB()
    }, []);

    const handleStartGame = () => {
        navigate("/game");
    };

    return (
    <div style={styles.container}>
      <h1 style={styles.title}>Higher-Lower Game</h1>

      <div style={styles.bestContainer}>
        <span>Personal Best:</span>
        <span style={styles.bestValue}>{personalBest ?? 0}</span>
      </div>

      <button style={styles.startButton} onClick={handleStartGame}>
        Start Game
      </button>
    </div>
    );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "#f3f4f6",
    gap: "30px"
  },
  title: {
    fontSize: "48px",
    color: "#111827"
  },
  bestContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    fontSize: "24px",
    color: "#1f2937"
  },
  bestValue: {
    fontWeight: "bold"
  },
  startButton: {
    padding: "15px 30px",
    fontSize: "20px",
    borderRadius: "10px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer"
  }
};