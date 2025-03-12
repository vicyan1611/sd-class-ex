import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ManagementSettings from "./pages/ManagementSettings";
import ConfigurationPage from "./pages/ConfigurationPage";
import Layout from "./components/Layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        {" "}
        <HomePage />
      </Layout>
    ),
  },
  {
    path: "/management-settings",
    element: (
      <Layout>
        <ManagementSettings />{" "}
      </Layout>
    ),
  },
  {
    path: "/configurations",
    element: (
      <Layout>
        <ConfigurationPage />
      </Layout>
    ),
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
