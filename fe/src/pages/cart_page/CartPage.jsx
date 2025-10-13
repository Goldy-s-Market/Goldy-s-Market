import { Link } from "react-router-dom";

function CartPage() {
  return (
    <div>
      <h1>This will be the cart page</h1>
      <p>
        <Link to="/">Click here to return to the home page.</Link>
      </p>
    </div>
  );
}

export default CartPage;
