import React, { useContext, useState } from "react";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState([]);

  // Delete the item from the cart
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await fetch(`http://localhost:3000/cart/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "Your item has been deleted.", "success");
            }
          });
      }
    });
  };

  // calcculate price of the item
  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // calculate total price of the cart
  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => {
      return total + calculatePrice(item);
    }, 0);
  };

  // Increase the quantity of the item
  const handleIncrease = (item) => {
    const updatedItem = { ...item, quantity: item.quantity + 1 };
    fetch(`http://localhost:3000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
  };

  // Decrease the quantity of the item
  const handleDecrease = (item) => {
    if (item.quantity === 1) {
      handleDelete(item);
      return;
    }
    const updatedItem = { ...item, quantity: item.quantity - 1 };
    fetch(`http://localhost:3000/cart/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ quantity: item.quantity - 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity - 1,
            };
          }
          return cartItem;
        });
        refetch();
        setCartItems(updatedCart);
      });
  };

  return (
    <div className="section-container">
      {/* banner */}
      <div className="text-center items-center px-4 pt-48 pb-24 md:w-4/5 mx-auto">
        <h2 className="section-heading">
          Items Added to The <span className="text-green">Cart</span>
        </h2>
      </div>

      {/* table for the cart*/}

      {cart.length > 0 ? (
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-green text-white">
                  <th> # </th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-full"
                      />
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td>
                      <button
                        className="btn btn-xs"
                        onClick={() => handleDecrease(item)}
                      >
                        -
                      </button>
                      <input
                        type="number"
                        value={item.quantity}
                        className="w-10 mx-2 text-center overflow-hidden appearance-none"
                      />
                      <button
                        className="btn btn-xs"
                        onClick={() => handleIncrease(item)}
                      >
                        +
                      </button>
                    </td>
                    <td>${calculatePrice(item).toFixed(2)}</td>
                    <td>
                      <button
                        className="btn bg-red text-white"
                        onClick={() => handleDelete(item)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* customer details */}
          <div className="my-12 flex flex-col md:flex-row justify-between items-start">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name: {user.displayName}</p>
              <p>Email: {user.email}</p>
              <p>user_id: {user.uid}</p>
            </div>

            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items: {cart.length}</p>
              <p>Total price: Rs{calculateTotalPrice().toFixed(2)}</p>
              <button className="btn bg-green text-white">
                Proceed Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold">No Items in the Cart</h2>
          <p className="text-gray-500">Please add some items to the cart</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back to Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
