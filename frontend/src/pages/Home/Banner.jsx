import React from "react";

const Banner = () => {
  return (
    <div className="bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
      <div className="section-container">
        <div className="py-24 flex flex-col md:flex-row-reverse justify-between items-center gap-8">
          {/* banner image */}
          <div className="md:w-1/2">
            <img src="/images/home/banner.png" alt="" />

            <div className="flex flex-col sm:flex-row items-center justify-around -mt-14 gap-4">
              <div className="flex bg-white py-2 px-2 rounded-2xl items-center gap-3 shadow-md w-60">
                <img
                  src="/images/home/b-food1.png"
                  alt=""
                  className=" rounded-xl"
                />
                <div className="space-y-1">
                  <h5 className="font-medium mb-1">Spicy Noodles</h5>
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                  </div>
                  <p className="text-red">$18.00</p>
                </div>
              </div>
              <div className="hidden sm:flex bg-white py-2 px-2 rounded-2xl items-center gap-3 shadow-md w-60">
                <img
                  src="/images/home/b-food1.png"
                  alt=""
                  className=" rounded-xl"
                />
                <div className="space-y-1">
                  <h5 className="font-medium mb-1">Spicy Noodles</h5>
                  <div className="rating rating-sm">
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      checked
                      readOnly
                    />
                    <input
                      type="radio"
                      name="rating-2"
                      className="mask mask-star-2 bg-yellow-500"
                      readOnly
                    />
                  </div>
                  <p className="text-red">$18.00</p>
                </div>
              </div>
            </div>
          </div>

          {/* text */}
          <div className="md:w-1/2 px-4  space-y-6 md:space-y-7">
            <h2 className="section-heading">
              Dive into Delights of Delectable{" "}
              <span className="text-green">Food</span>
            </h2>
            <p className="text-base md:text-xl text-[#4A4A4A]">
              Where Each Plate Weaves a Story of Curlinary Mastery and
              Passionate Craftsmanship
            </p>
            <button className="btn bg-green px-8 py-3 font-semibold text-white rounded-full">
              Order Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
