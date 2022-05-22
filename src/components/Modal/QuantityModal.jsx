import React, { useState } from "react";
import "./QuantityModal.css";
import { useDispatch } from "react-redux";
import { updateQuantity } from "../../store/cartSlice";

const QuantityModal = ({ setQtyModal, product }) => {
  const dispatch = useDispatch();
  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const [newQty, setNewQty] = useState(1);
  const handleDoneButton = (e) => {
    e.preventDefault();
    const obj = { newQty, product };
    if (newQty !== product.qty) {
      dispatch(updateQuantity(obj));
    }
    setQtyModal(false);
  };
  return (
    <div id="quantityDiv">
      <div className="qtyInnerDiv">
        <p className="qtyHead">Select Quantity</p>
        <div className="qtyDiv">
          {numbers.map((number) => {
            return (
              <button onClick={(e) => setNewQty(number)} className="qtyButton">
                {number}
              </button>
            );
          })}
        </div>
        <button onClick={(e) => handleDoneButton(e)} className="qtyDoneBtn">
          DONE
        </button>
      </div>
    </div>
  );
};

export default QuantityModal;
