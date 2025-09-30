import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <h1>This will be the login page</h1>
      <p>
        <Link to="/">Click here to return to the home page.</Link>
      </p>
    </div>
  );
}

export default LoginPage;
