import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
type Frameworks = { // ChatGPT
  [framework: string]: string;
};
export function Game() {
  const navigate = useNavigate()
  const [frameworks, setFrameworks] = useState<Frameworks | null>(null);
  const [guessed, setGuessed] = useState<boolean>(false)
  const [lives, setLives] = useState<number>(3)
  const [score, setScore] = useState<number>(0)
  const [finished, setFinished] = useState<boolean>(false)
  
  // ChatGPT
  const frameworkNames = frameworks ? Object.keys(frameworks) : [];
  const frameworkValues = frameworks ? Object.values(frameworks) : [];
  //

  const newFrameworks = async () => {
    const response: Frameworks = await fetch("https://www.junglediff.cz/higher-lower-api/getFrameworks.php", {method: "POST"}).then(r => r.json());
    console.log(response)
    await new Promise(r => setTimeout(r, 3000)); // ChatGPT
    setFrameworks(response)
  }
  const handleChoose = async (fw: number) => {
    setGuessed(true);

    const selectedPercent = parseFloat(frameworkValues[fw].replace('%', ''));
    const otherPercent = parseFloat(frameworkValues[1 - fw].replace('%', ''));

    if (selectedPercent > otherPercent) {
      setScore(score + 1)
    } else {
      setLives(lives - 1)
      if (lives === 0) {
        return
      }
    }
    
    console.log(lives)

    await newFrameworks();

    setGuessed(false);
  };

  useEffect(() => {
    newFrameworks()
  }, []);

  // Kontrola konce
  const FinishGame = async () => {
    try {
        const response = await fetch("https://www.junglediff.cz/higher-lower-api/updatePB.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            username: localStorage.getItem("username"),
            newScore: score
          })
        });

        const data = await response.json();
        if (!response.ok) {
            alert("ERROR: " + data.error)
            return
        }
      } catch (err) {
        alert("An error occured" + err);
        console.log(err)
    }

    setFinished(true)
    setFrameworks(null)
    await new Promise(r => setTimeout(r, 3000)); // ChatGPT

    navigate("/")
  }
  useEffect(() => {
    if (lives <= 0) {
      FinishGame()
    }
  }, [guessed])

  return (
    <div style={styles.container}>
        <div style={styles.score}>Score: {score}</div>
        <div style={styles.lives}>Lives: {lives}</div>
        {frameworks ? (
            <>
            <div style={styles.card}>
                <h2 style={styles.title}>{frameworkNames[0]}</h2>
                <h3 style={styles.title}>{guessed ? frameworkValues[0] : ""}</h3>
                {!guessed ? (
                  <button style={styles.button} onClick={() => handleChoose(0)}>
                Choose
                </button>
                ) : <span></span>}
            </div>

            <div style={styles.orContainer}>
                <span style={styles.orText}>OR</span>
            </div>

            <div style={styles.card}>
                <h2 style={styles.title}>{frameworkNames[1]}</h2>
                <h3 style={styles.title}>{guessed ? frameworkValues[1] : ""}</h3>
                {!guessed ? (<button style={styles.button} onClick={() => handleChoose(1)}>
                Choose
                </button>) : <span></span>}
            </div>
            </>
        ) : (
            <p style={styles.orText}>{!finished ? "Loading frameworks..." : "Game over!"}</p>
        )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "20px",
    height: "100vh",
    background: "#f3f4f6"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "10px",
    width: "200px",
    textAlign: "center",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  title: {
    fontSize: "24px",
    color: "#111827"
  },
  button: {
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer"
  },
  orContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orText: {
    fontSize: "20px",
    fontWeight: "bold",
    color: "#6b7280"
  },
  score: {
    position: "absolute",
    top: "20px",
    left: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#111"
  },
  lives: {
    position: "absolute",
    top: "20px",
    right: "20px",
    fontSize: "22px",
    fontWeight: "bold",
    color: "#b91c1c"
  }
};