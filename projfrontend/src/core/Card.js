import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/Cardhelper";
import Imagehelper from "./helper/Imagehelper";

const Card = ({
  product,
  addtoCart = true,
  removefromcart = false,
  setReload = (f) => f,
  //function(f){return f}
  reload = undefined,
}) => {
  const [redirect, setRedirect] = useState(false);
  const [count, setCount] = useState(product.count);

  const cardTitle = product ? product.name : "A photo from pexels";
  const cardDescription = product ? product.description : "Default description";
  const cardPrice = product ? product.price : "Default";

  const addToCart = () => {
    addItemToCart(product, () => {
      setRedirect(true);
    });
  };

  const getaRedirect = (redirect) => {
    if (redirect) {
      return <Redirect to="/cart" />;
    }
  };

  const showAddtoCart = () => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn w-100 btn-block btn-outline-success mt-2 mb-2"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemovefromcart = () => {
    return (
      removefromcart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setReload(!reload);
          }}
          className="btn w-100 btn-block btn-outline-danger mt-2 mb-2"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="text-center card text-white bg-dark border border-info ">
      <div className="card-header lead">{cardTitle}</div>
      <div className="card-body">
        {getaRedirect(redirect)}
        <Imagehelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {cardDescription}
        </p>
        <p className="btn btn-success rounded btn-sm px-4">${cardPrice}</p>
        <div className="row">
          <div className="col-12">{showAddtoCart()}</div>
          <div className="col-12">{showRemovefromcart()}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
