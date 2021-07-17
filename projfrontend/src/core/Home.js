import React, { useEffect, useState } from "react";
import { API } from "../backend";
import "../styles.css";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";

const Home = () => {
  console.log("API IS", API);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(false);

  const loadAllProducts = () => {
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProducts(data);
      }
    });
  };

  useEffect(() => {
    loadAllProducts();
  }, []);

  return (
    <Base title="Home Page" description="Welcome to the Home page">
      <div className="row text-center">
        <h1 className="text-white">All of T-shirts</h1>
        <div className="row">
          {products.map((aproduct, index) => {
            return (
              <div key={index} className="col-4 mb-4">
                <Card product={aproduct} />
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default Home;
