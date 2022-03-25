import "./styles.css";
import "antd/dist/antd.dark.css";
import { init, AuthType } from "@thoughtspot/visual-embed-sdk";
import { HashRouter, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { Nav } from "./components/nav/nav";

const USERNAME = "demo-user";


init({
  thoughtSpotHost: "embed-1-do-not-delete.thoughtspotdev.cloud",
  authType: AuthType.AuthServer,
  // See https://github.com/thoughtspot/node-token-auth-server-example
  // for the implementation of the below endpoint.
  authEndpoint:
    "https://node-token-auth-server-example-6aq2u17yj-ashubham.vercel.app/api/gettoken/" +
    USERNAME,
  username: USERNAME,
  autoLogin: true
});

function AppView() {
  const element = useRoutes(routes);
  return (
    <div className="App">
      <Nav />
      {element}
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AppView />
    </HashRouter>
  );
}
