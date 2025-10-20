import { useState, useEffect } from "react";
import ProductCard from "../home_page/CardPage";

const useListingsData = () => {
  const [listings, setListings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => {
        if (res.status >= 400) {
          throw new Error("server error");
        }
        return res.json();
      })
      .then((json) => setStoreItems(json))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  return { listings, error, loading };
}

function ListingsPage() {
  return (
    <>
      <ProductCard>
      </ProductCard>
    </>
  );
}

export default ListingsPage;
