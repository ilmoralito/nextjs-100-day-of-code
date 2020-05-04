import ShowContext from "../components/showContext";
import UserContext from "../components/userContext";
import useRouter from "next/router";
import "../styles/global.css";

export default function App({ Component, pageProps }) {
  const [user, setUser] = React.useState(null);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

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

  function saveSearchTerm(searchTerm) {
    setSearchTerm(searchTerm);
  }

  function saveSearchResults(searchResults) {
    setSearchResults(searchResults);
  }

  return (
    <UserContext.Provider value={{ user, signIn, signOut }}>
      <ShowContext.Provider
        value={{ searchTerm, searchResults, saveSearchTerm, saveSearchResults }}
      >
        <Component {...pageProps} />
      </ShowContext.Provider>
    </UserContext.Provider>
  );
}
