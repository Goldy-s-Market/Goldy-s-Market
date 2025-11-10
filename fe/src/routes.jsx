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
      // { path: "login", element: <LoginPage /> },
      // { path: "messages", element: <MessagesPage /> },
      // { path: "listings", element: <ListingsPage /> },
      // { path: "listings/add", element: <AddListingPage /> },
      // { path: "listings/:id", element: <IndividualListingPage /> },
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
    ],
  },
];

export default routes;
