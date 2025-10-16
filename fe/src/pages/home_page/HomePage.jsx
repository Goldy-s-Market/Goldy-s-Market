import { Link } from "react-router-dom";
import Footer from './Footer.jsx';
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
      <Footer>
      <Footer />
    </div>
  );
}

export default HomePage;
