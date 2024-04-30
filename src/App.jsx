import "./App.css";
import Game from "./pages/Game";
import Registration from "./pages/Registration";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import { UserProvider } from "./context/UserContext";
import Nav from "./pages/Nav";
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
    path: `/`,
    element: <Game />,
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
