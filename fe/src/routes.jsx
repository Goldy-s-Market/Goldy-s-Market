import App from "./App";
import HomePage from "./pages/home_page/HomePage";
import ErrorPage from "./pages/error_page/ErrorPage";
import CartPage from "./pages/cart_page/CartPage";
import LoginPage from "./pages/login_page/LoginPage";
import MessagesPage from "./pages/messages_page/MessagesPage";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      // { path: "cart", element: <CartPage /> },
      { path: "messages", element: <MessagesPage /> },
    ],
  },
];

export default routes;
