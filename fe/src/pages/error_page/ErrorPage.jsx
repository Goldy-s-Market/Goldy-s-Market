import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <h1>Uh oh! The page you're looking for does not exist</h1>
      <p>
        <Link to="/">Click here to return to the home page.</Link>
      </p>
    </div>
  );
}

export default ErrorPage;
