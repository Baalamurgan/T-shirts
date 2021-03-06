import React, { useEffect, useState } from "react";
import Base from "./Base";
import Card from "./Card";
import { loadCart } from "./helper/Cardhelper";

const Cart = () => {
  const [products, setProducts] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    setProducts(loadCart);
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h2>This section is to load products</h2>
        {products.map((aproduct, index) => (
          <Card
            key={index}
            product={aproduct}
            addtoCart={false}
            removefromcart={true}
            setReload={setReload}
            reload={reload}
          />
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This section is for Checkout</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to Checkout">
      <div className="row text-center">
        <div className="col-6">
          {products.length > 0 ? (
            loadAllProducts(products)
          ) : (
            <h3>No products in Cart</h3>
          )}
        </div>
        <div className="col-6">
          <h2>Payment Section</h2>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
