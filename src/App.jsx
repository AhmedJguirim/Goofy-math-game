import "./App.css";
import Game from "./pages/Game";
import Registration from "./pages/Registration";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import Nav from "./pages/Nav";
import GameMode from "./pages/GameMode";
import IronMan from "./pages/IronMan";
const router = createBrowserRouter([
  {
    path: `/login`,
    element: <Login />,
  },
  {
    path: `/register`,
    element: <Registration />,
  },
  {
    path: `/game`,
    element: <Game />,
  },
  {
    path: `/ironMan`,
    element: <IronMan />,
  },
  {
    path: `/mode`,
    element: <GameMode />,
  },
]);
function App() {
  return (
    <>
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </>
  );
}

export default App;
