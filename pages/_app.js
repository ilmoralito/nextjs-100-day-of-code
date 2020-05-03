// Add global CSS
import UserContext from "../components/userContext";
import useRouter from "next/router";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const user = localStorage.getItem("100daysofcode-user");

    if (user) {
      setUser(user);

      return;
    }

    useRouter.push("/signin");
  }, [user]);

  function signIn({ username }) {
    localStorage.setItem("100daysofcode-user", username);

    setUser(username);
    useRouter.push("/");
  }

  function signOut() {
    localStorage.removeItem("100daysofcode-user");

    setUser(null);
    useRouter.push("/signin");
  }

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}
