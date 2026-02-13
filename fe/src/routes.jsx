import App from "./App";
import HomePage from "./pages/home_page/HomePage";
import ErrorPage from "./pages/error_page/ErrorPage";
import LoginPage from "./pages/login_page/LoginPage";
import MessagesPage from "./pages/messages_page/MessagesPage";
import ListingsPage from "./pages/listings/ListingsPage";
import IndividualListingPage from "./pages/listings/IndividualListingPage";
import AddListingPage from "./pages/listings/AddListingPage";
import GuestRoute from "./components/GuestRoute";
import ProtectedRoute from "./components/ProtectedRoute";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", 
        element: (
          <GuestRoute>
            <LoginPage /> 
          </GuestRoute>
        )
      },
      { path: "messages", 
        element: (
          <ProtectedRoute>
            <MessagesPage /> 
          </ProtectedRoute>
        )
      },
      { path: "listings", 
        element: (
          <ProtectedRoute>
            <ListingsPage /> 
          </ProtectedRoute>
        )
      },
      { path: "listings/add", 
        element: (
          <ProtectedRoute>
            <AddListingPage /> 
          </ProtectedRoute>
        )
      },
      { path: "listings/:id", 
        element: (
          <ProtectedRoute>
            <IndividualListingPage /> 
          </ProtectedRoute>
        )
      },
    ],
  },
];

export default routes;
