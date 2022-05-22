import React, { useEffect, useState } from "react";
import "./SizeModal.css";
import { useDispatch } from "react-redux";
import { updateSize } from "../../store/cartSlice";

const SizeModal = ({ setSizeModal, product }) => {
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState([]);
  const [height, setHeight] = useState("");
  const [newSize, setNewSize] = useState(product.size);
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
    if (numberArr.length > 5) {
      setHeight("280px");
    } else {
      setHeight("200px");
    }
    setNumbers(numberArr);
  }, []);
  return (
    <div className="wrapper">
      <div id="sizeDiv">
        <div className="qtyInnerDiv">
          <p className="qtyHead">Select Size</p>
          <div style={{ height: { height } }} className="qtyDiv">
            {numbers.map((number) => {
              return (
                <button
                  onClick={(e) => setNewSize(number)}
                  className="sizeButton"
                >
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
    </div>
  );
};

export default SizeModal;
