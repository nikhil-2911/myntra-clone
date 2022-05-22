import React from "react";
import "./CartPage.css";
import { useSelector, useDispatch } from "react-redux";

// images
import downIcon from "../../utils/images/down-arrow.svg";

// Component
import Navbar from "../../components/Navbar/Navbar";
import { removeProduct } from "../../store/cartSlice";
import { toast } from "react-hot-toast";

const CartPage = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.items);
  console.log(cartProducts);
  const removeButtonHandler = (e, id, size) => {
    e.preventDefault();
    const actionObj = {
      id,
      size,
    };
    dispatch(removeProduct(actionObj));
    toast.success("Product removed successfully", {
      position: "top-right",
    });
  };
  return (
    <>
      <Navbar show={false} />
      <div id="cartSection">
        <div id="cartDiv">
          <div className="leftSideCart">
            {cartProducts.map((product) => {
              return (
                <div className="cartCard">
                  <div>
                    <img
                      className="cartCardImage"
                      src={product.searchImage}
                      alt="productImage"
                    />
                  </div>
                  <div className="cartCardData">
                    <p className="cartCardBrand">{product.brand}</p>
                    <p className="cartCardName">
                      {product.productName.substring(product.brand.length)}
                    </p>
                    <button className="cartButton">
                      Size: {product.size}
                      <img className="cartIcon" src={downIcon} alt="arrow" />
                    </button>
                    <button className="cartButton">
                      Qty: {product.qty}
                      <img className="cartIcon" src={downIcon} alt="arrow" />
                    </button>
                    <br />
                    <div className="cartPriceDetails">
                      <span className="cartPrice">
                        ₹ {product.price * product.qty}
                      </span>
                      <span className="cartMrp">
                        <s>₹ {product.mrp * product.qty}</s>
                      </span>
                      <span className="cartDiscount">
                        {product.discountDisplayLabel.substring(1, 3)} % OFF
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) =>
                      removeButtonHandler(e, product.productId, product.size)
                    }
                    className="removeButton"
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
          <div className="rightSideCart">RightSide</div>
        </div>
      </div>
    </>
  );
};

export default CartPage;
