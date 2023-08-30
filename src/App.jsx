import ProtectedRoute from "./components/ProtectedRoute";
import UnprotectedRoute from './components/UnprotectedRoute'
import MainLayout from "./layout";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SingUp";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: (
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          ),
        },
        {
          path: "/sign-up",
          element: (
            <UnprotectedRoute>
              <SignUp />
            </UnprotectedRoute>
          ),
        },
        {
          path: "/sign-in",
          element: (
            <UnprotectedRoute>
              <SignIn />
            </UnprotectedRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
