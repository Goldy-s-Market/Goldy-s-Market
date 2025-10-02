import { Link } from "react-router-dom";
import Card from "../products_page/CardPage";
function MessagesPage() {
  return (
    <div>
      <h1>This will be the messages page</h1>
      <p>
        <Link to="/">Click here to return to the home page.</Link>
      </p>
    </div>
  );
}

export default MessagesPage;
