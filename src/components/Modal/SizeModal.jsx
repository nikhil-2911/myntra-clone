import React, { useEffect, useState } from "react";
import "./SizeModal.css";
import { useDispatch } from "react-redux";
import { updateSize } from "../../store/cartSlice";

const SizeModal = ({ setSizeModal, product }) => {
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState([]);
  const [newSize, setNewSize] = useState(0);
  const handleDoneButton = (e) => {
    e.preventDefault();
    const obj = { newSize, product };
    if (newSize !== product.size) {
      dispatch(updateSize(obj));
    }
    setSizeModal(false);
  };
  useEffect(() => {
    let numberArr = [];
    product.sizes.split(",").map((size) => {
      numberArr.push(size);
    });
    setNumbers(numberArr);
  }, []);
  return (
    <div id="sizeDiv">
      <div className="qtyInnerDiv">
        <p className="qtyHead">Select Size</p>
        <div className="qtyDiv">
          {numbers.map((number) => {
            return (
              <button onClick={(e) => setNewSize(number)} className="qtyButton">
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

export default SizeModal;
