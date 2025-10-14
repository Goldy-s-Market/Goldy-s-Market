import { Link } from "react-router-dom";
import MarketplaceSection from "./HomePageSection3";
import ProductCard from "./CardPage";

function HomePage() {
  return (
    <div>
      <h1 className="underline">This will be the home page</h1>
      <MarketplaceSection>
      <MarketplaceSection />
      <div>
        <ProductCard
          name="Decorative Home Table"
          price="$199.0"
          vendorName="Albert Einstein">
        </ProductCard>
      </div>
    </div>
  );
}

export default HomePage;
