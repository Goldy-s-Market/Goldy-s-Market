import App from "./App";
import HomePage from "./pages/home_page/HomePage";
import ErrorPage from "./pages/error_page/ErrorPage";
import LoginPage from "./pages/login_page/LoginPage";
import MessagesPage from "./pages/messages_page/MessagesPage";
import ListingsPage from "./pages/listings/ListingsPage";
import IndividualListingPage from "./pages/listings/IndividualListingPage";
import AddListingPage from "./pages/listings/AddListingPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "messages", element: <MessagesPage /> },
      { path: "listings", element: <ListingsPage /> },
      { path: "listings/add", element: <AddListingPage /> },
      { path: "listings/:id", element: <IndividualListingPage /> },
    ],
  },
];

export default routes;
