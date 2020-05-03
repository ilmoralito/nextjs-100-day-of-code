import { useState, useContext } from "react";
import UserContext from "../components/userContext";

export default function SignIn() {
  const { signIn } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const onSubmitHandler = (event) => {
    event.preventDefault();

    authenticate();
  };

  const authenticate = () => {
    if (username === "admin" && password === "admin") {
      signIn({ username });

      return;
    }

    setMessage("Invalid credentials");
  };

  return (
    <>
      <style jsx global>{`
        body {
          background-color: white;
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        label {
          display: block;
        }

        .group {
          margin-bottom: 10px;
        }

        .message {
          background-color: tomato;
          text-align: center;
          border-radius: 4px;
          padding: 15px;
          color: white;
        }

        input,
        button {
          padding: 10px;
          border-radius: 4px;
        }

        input {
          border: 1px solid steelblue;
        }

        button {
          border: 1px solid gray;
        }
      `}</style>
      <form onSubmit={onSubmitHandler} autoComplete="off">
        <div className="group">
          <label htmlFor="username">Username</label>
          <input
            name="username"
            id="username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>

        <div className="group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="group">
          <button type="submit">Sign in</button>
        </div>

        {message && <Message>{message}</Message>}
      </form>
    </>
  );
}

function Message({ children }) {
  return (
    <>
      <div className="message">{children}</div>
    </>
  );
}
