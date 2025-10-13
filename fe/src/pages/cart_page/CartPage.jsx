import { Link } from "react-router-dom";
import ProductCard from "../CardPage";
function CartPage() {
  return (
    <div>
      <h1>This will be the cart page</h1>
      <p>
        <Link to="/">Click here to return to the home page.</Link>
        <div>
          <ProductCard
          name="Mourya y"
          price="$199.0">
          </ProductCard>
        </div>
      </p>
    </div>
  );
}

export default CartPage;
