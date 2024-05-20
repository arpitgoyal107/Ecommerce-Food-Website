import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { AuthContext } from "../contexts/AuthProvider";
import Swal from "sweetalert2";
import useCart from "../hooks/useCart";

const Cards = ({ item }) => {
  const { name, image, recipe, price, _id } = item;
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const { user } = useContext(AuthContext);

  const [cart, refetch] = useCart();

  const navigate = useNavigate();
  const location = useLocation();

  const handleHeartClick = () => {
    setIsHeartFilled(!isHeartFilled);
  };

  const handleAddToCart = (item) => {
    // console.log("Item added to cart", item);
    if (user && user?.email) {
      // add item to cart
      const cartItem = {
        menuItemId: item._id,
        name,
        quantity: 1,
        price,
        image,
        email: user.email,
      };

      // check item already in cart
      if (cart.some((cartItem) => cartItem.menuItemId === item._id)) {
        Swal.fire({
          // warning icon
          icon: "warning",
          text: "Product already present in the cart",
        });
        return;
      }

      // console.log("Cart Item", cartItem);
      fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data)

          // show success message
          Swal.fire({
            icon: "success",
            title: "Item added to cart successfully!",
          });
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Please login to add item to cart",
        showCancelButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/signup", { state: { from: location } });
        }
      });
    }
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl rounded-xl rounded-tr-[35px] relative">
      <div
        className={`absolute z-[1] top-0 right-0 p-4 heartStar bg-green ${
          isHeartFilled ? "text-rose-500" : "text-white"
        } `}
        onClick={handleHeartClick}
      >
        <FaHeart className="h-5 w-5 cursor-pointer" />
      </div>

      <Link to={`/menu/${item._id}`}>
        <img
          src={item.image}
          alt={item.name}
          className="hover:scale-105 transition-all duration-200 h-56 md:h-72 mx-auto"
        />
      </Link>

      <div className="card-body">
        <Link to={`/menu/${item._id}`}>
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>{item.recipe}</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-red text-sm">$ </span>
            {item.price}
          </h5>
          <button
            className="btn bg-green text-white"
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
