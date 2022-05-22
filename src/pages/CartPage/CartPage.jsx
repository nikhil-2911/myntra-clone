import React, { useState, useEffect } from "react";
import "./CartPage.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeProduct } from "../../store/cartSlice";
import { saveSelectedProduct } from "../../store/filterSlice";
import { toast } from "react-hot-toast";

// images
import downIcon from "../../utils/images/down-arrow.svg";

// Component
import Navbar from "../../components/Navbar/Navbar";
import QuantityModal from "../../components/Modal/QuantityModal";
import SizeModal from "../../components/Modal/SizeModal";

const CartPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.cart.items);
  const [product, setProduct] = useState({});
  const [qtyModal, setQtyModal] = useState(false);
  const [sizeModal, setSizeModal] = useState(false);
  const [cartDetails, setCartDetails] = useState({
    totalMrp: "",
    totalDiscount: "",
    totalAmount: "",
    totalItems: "",
  });
  const handleClick = (e, product) => {
    e.preventDefault();
    dispatch(saveSelectedProduct(product));
    navigate("/product");
  };
  // console.log(cartProducts);
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
  const handleSizeButton = (e, product) => {
    e.preventDefault();
    setProduct(product);
    setSizeModal(true);
  };
  const handleQuantityButton = (e, product) => {
    e.preventDefault();
    setProduct(product);
    setQtyModal(true);
  };

  useEffect(() => {
    let totalAmount = 0,
      totalMrp = 0,
      totalDiscount = 0,
      totalQty = 0;
    cartProducts.map((product) => {
      totalAmount += product.price * product.qty;
      totalMrp += product.mrp * product.qty;
      totalDiscount += product.discount * product.qty;
      totalQty += product.qty;
    });
    setCartDetails({
      totalMrp,
      totalDiscount,
      totalAmount,
      totalItems: totalQty,
    });
  }, [cartProducts]);
  return (
    <>
      {qtyModal && (
        <QuantityModal product={product} setQtyModal={setQtyModal} />
      )}
      {sizeModal && <SizeModal product={product} setSizeModal={setSizeModal} />}
      <Navbar show={false} />
      <div id="cartSection">
        <div id="cartDiv">
          {cartProducts.length === 0 ? (
            <h2>
              Bag is empty{" "}
              <a className="continueShopping" href="/">
                Continue Shopping :)
              </a>
            </h2>
          ) : (
            <>
              <div className="leftSideCart">
                {cartProducts.map((product) => {
                  return (
                    <div className="cartCard">
                      <div>
                        <img
                          onClick={(e) => handleClick(e, product)}
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
                        <button
                          onClick={(e) => handleSizeButton(e, product)}
                          className="cartButton"
                        >
                          Size: {product.size}
                          <img
                            className="cartIcon"
                            src={downIcon}
                            alt="arrow"
                          />
                        </button>
                        <button
                          onClick={(e) => handleQuantityButton(e, product)}
                          className="cartButton"
                        >
                          Qty: {product.qty}
                          <img
                            className="cartIcon"
                            src={downIcon}
                            alt="arrow"
                          />
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
                          removeButtonHandler(
                            e,
                            product.productId,
                            product.size
                          )
                        }
                        className="removeButton"
                      >
                        X
                      </button>
                    </div>
                  );
                })}
              </div>
              <div className="rightSideCart">
                <div id="cartPriceDetailsDiv">
                  <div className="cartPriceRow">
                    <span className="cartPriceItems">
                      PRICE DETAILS: ({cartDetails.totalItems} items)
                    </span>
                  </div>
                  <div className="cartPriceRow">
                    <span className="cartPriceFirst">Total MRP : </span>
                    <span className="cartPriceEnd">
                      ₹ {cartDetails.totalMrp}
                    </span>
                  </div>
                  <div className="cartPriceRow">
                    <span className="cartPriceFirst">Total Discount : </span>
                    <span style={{ color: "#03a685" }} className="cartPriceEnd">
                      ₹ {cartDetails.totalDiscount}
                    </span>
                  </div>
                  <div className="cartPriceRow">
                    <span className="cartPriceFirst">Convienence Fee :</span>
                    <span style={{ color: "#03a685" }} className="cartPriceEnd">
                      <s style={{ color: "gray" }}>₹ 99</s> Free
                    </span>
                  </div>
                </div>
                <div id="cartPlaceOrder">
                  <div className="cartPriceRow">
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      Total Amount :{" "}
                    </span>
                    <span style={{ fontSize: "16px", fontWeight: "bold" }}>
                      ₹ {cartDetails.totalAmount}
                    </span>
                  </div>
                </div>
                <button className="placeButton">PLACE ORDER</button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default CartPage;
