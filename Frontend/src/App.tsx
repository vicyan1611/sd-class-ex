import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManagementSettings from "./pages/ManagementSettings";
import ConfigurationPage from "./pages/ConfigurationPage";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/management-settings",
    element: <ManagementSettings />,
  },
  {
    path: "/configurations",
    element: <ConfigurationPage />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
