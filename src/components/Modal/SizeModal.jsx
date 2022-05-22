import React, { useEffect, useState } from "react";
import "./SizeModal.css";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addProduct, updateSize } from "../../store/cartSlice";
import { removeProduct } from "../../store/wishlistSlice";

const SizeModal = ({ setSizeModal, product, setShowModal, wishlist }) => {
  const dispatch = useDispatch();
  const [numbers, setNumbers] = useState([]);
  const [height, setHeight] = useState("");
  const [newSize, setNewSize] = useState(product.size);
  const handleDoneButton = (e) => {
    e.preventDefault();
    if (wishlist) {
      if (newSize) {
        const obj = { ...product, size: newSize, qty: 1 };
        dispatch(addProduct(obj));
        dispatch(removeProduct(obj));
        setShowModal(false);
        toast.success("Product moved to wishlist successfully", {
          position: "top-right",
        });
      } else {
        toast.error("Please, select one size", {
          position: "top-center",
        });
      }
    } else {
      const obj = { newSize, product };
      if (newSize !== product.size) {
        dispatch(updateSize(obj));
      }
      setSizeModal(false);
    }
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
