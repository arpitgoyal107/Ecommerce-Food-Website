import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "../../components/Cards";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

const nextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const prevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      PREV
    </div>
  );
};

const SpecialDishes = () => {
  const [recipes, setRecipes] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        const specials = data.filter((item) => item.category === "popular");
        // console.log(specials);
        setRecipes(specials);
      });
  }, []);

  // settings for the slider
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    nextArrow: <nextArrow />,
    prevArrow: <prevArrow />,
  };

  return (
    <div className="section-container py-16 relative">
      <div className="text-left px-4">
        <p className="section-subHeading">Special Dishes</p>
        <h2 className="section-heading md:w-[400px]">
          Standout Dishes From Our Menu
        </h2>
      </div>

      <div className="md:absolute top-0 right-0 md:mr-4 xl:mr-24 mt-6 md:mt-28 px-4">
        <button
          onClick={() => slider.current.slickPrev()}
          className="btn  p-2 rounded-full mr-5"
        >
          <FaAngleLeft className="h-8 w-8 p-1" />
        </button>
        <button
          onClick={() => slider.current.slickNext()}
          className="btn bg-green  p-2 rounded-full ml-5"
        >
          <FaAngleRight className="h-8 w-8 p-1" />
        </button>
      </div>

      <Slider ref={slider} {...settings} className=" md:my-12">
        {recipes.map((recipe, i) => (
          <div key={i} className="px-6 pb-9">
            {" "}
            {/* Apply spacing here */}
            <Cards item={recipe} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SpecialDishes;
