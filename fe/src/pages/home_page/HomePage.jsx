import { Link } from "react-router-dom";
import Card from "../products_page/CardPage";
function HomePage() {
  return (
    <div>
      <h1 className="underline">This will be the home page</h1>
      <div>
        <Card></Card>
      </div>
    </div>
  );
}

export default HomePage;
