import React, { useEffect, useState } from "react";
import Cards from "./../../components/Cards";
import { FaFilter } from "react-icons/fa";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption, setSortOption] = useState("default");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  // fetching menu data
  useEffect(() => {
    // fetch data from the backend
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/menu");
        const data = await response.json();
        // console.log(data);
        setMenu(data);
        setFilteredItems(data);
      } catch (error) {
        console.log(error);
      }
    };

    // call the function
    fetchData();
  }, []);

  // filter items based on category
  const filterItems = (category) => {
    const filtered =
      category === "all"
        ? menu
        : menu.filter((item) => item.category === category);

    setFilteredItems(filtered);
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  // show all items
  const showAll = () => {
    setFilteredItems(menu);
    setSelectedCategory("all");
    setCurrentPage(1);
  };

  // sort items based on A-Z, Z-A, price low-high, price high-low
  const sortItems = (option) => {
    setSortOption(option);

    let sortedItems = [...filteredItems];

    // logic
    switch (option) {
      case "default":
        break;
      case "A-Z":
        sortedItems.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Z-A":
        sortedItems.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "low-to-high":
        sortedItems.sort((a, b) => a.price - b.price);
        break;
      case "high-to-low":
        sortedItems.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredItems(sortedItems);
    setCurrentPage(1);
  };

  // pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="section-container py-24">
      {/* menu banner */}
      <div className="text-center items-center px-4 py-48  space-y-6 md:space-y-7 md:w-4/5 mx-auto">
        <h2 className="section-heading">
          For the Love of Delicious <span className="text-green">Food</span>
        </h2>
        <p className="text-base md:text-xl text-[#4A4A4A]">
          Come with family & feel the joy of mouthwatering food such as Greek
          salad, Lasagne, Butternut Pumpkin, Tokusen Wagyu, Olivas Rellenas and
          more for a moderate cost.
        </p>
        <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
          Order Now
        </button>
      </div>

      {/* menu shop section */}
      <div>
        {/* filtering and sorting buttons */}
        <div className="flex flex-col sm:flex-row flex-wrap sm:justify-between items-center space-y-3 mb-8">
          {/* category btns */}
          <div className="flex flex-row flex-wrap gap-4 md:gap-8 justify-start md:items-start">
            <button
              onClick={showAll}
              className={selectedCategory === "all" ? "active" : ""}
            >
              All
            </button>
            <button
              onClick={() => filterItems("salad")}
              className={selectedCategory === "salad" ? "active" : ""}
            >
              Salad
            </button>
            <button
              onClick={() => filterItems("pizza")}
              className={selectedCategory === "pizza" ? "active" : ""}
            >
              Pizza
            </button>
            <button
              onClick={() => filterItems("soup")}
              className={selectedCategory === "soup" ? "active" : ""}
            >
              Soups
            </button>
            <button
              onClick={() => filterItems("dessert")}
              className={selectedCategory === "dessert" ? "active" : ""}
            >
              Desserts
            </button>
            <button
              onClick={() => filterItems("drinks")}
              className={selectedCategory === "drinks" ? "active" : ""}
            >
              Drinks
            </button>
          </div>

          {/* sorting btn */}
          <div>
            <div className="flex flex-row items-center p-2 bg-black rounded-lg">
              <FaFilter className="h-4 w-4 text-white" />
              <select
                name="sort"
                id="sort"
                value={sortOption}
                onChange={(e) => sortItems(e.target.value)}
                className="bg-black text-white border-none outline-none px-2 py-1"
              >
                <option value="default">Default</option>
                <option value="A-Z">A-Z</option>
                <option value="Z-A">Z-A</option>
                <option value="low-to-high">Price: Low to High</option>
                <option value="high-to-low">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* product card */}
        <div className=" grid md:grid-cols-3 lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8">
          {currentItems.map((item) => (
            <Cards key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* pagination */}
      <div className="flex justify-center my-8">
        {Array.from({
          length: Math.ceil(filteredItems.length / itemsPerPage),
        }).map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`mx-1 px-3 py-1 rounded-full ${
              currentPage === index + 1
                ? "bg-green text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Menu;
