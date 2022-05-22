import React, { useState } from "react";
import "./WishlistCard.css";
import SizeModal from "../Modal/SizeModal";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { addProduct } from "../../store/cartSlice";
import { removeProduct } from "../../store/wishlistSlice";
import { saveSelectedProduct } from "../../store/filterSlice";

const WishlistCard = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleCardClick = (e) => {
    dispatch(saveSelectedProduct(product));
    navigate("/product");
  };
  const handleRemoveClick = (e) => {
    e.preventDefault();
    dispatch(removeProduct(product));
    toast.success("Product removed from wishlist successfully", {
      position: "top-right",
    });
  };
  const moveToBagHandler = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  return (
    <>
      {showModal && (
        <SizeModal
          product={product}
          setShowModal={setShowModal}
          wishlist={true}
        />
      )}
      <div id="wishlistCard">
        <button onClick={(e) => handleRemoveClick(e)} className="cross">
          X
        </button>
        <img
          onClick={(e) => handleCardClick(e)}
          className="profilePhoto"
          src={product.images[0].src}
          alt="#photo"
        />
        <div id="productDetails">
          <div className="brandInfoDiv">
            <p className="brandText">{product.brand}</p>
            <p className="infoText">{product.additionalInfo}</p>
          </div>
          <div className="discountDiv">
            <span className="productPrice">{`Rs. ${product.price}`}</span>
            <span className="productMrp">
              <s>{`Rs. ${product.mrp}`}</s>
            </span>
            <span className="productDiscount">{`${product.discountDisplayLabel}`}</span>
          </div>
          <button
            onClick={(e) => moveToBagHandler(e)}
            className="moveBagButton"
          >
            MOVE TO BAG
          </button>
        </div>
      </div>
    </>
  );
};

export default WishlistCard;
