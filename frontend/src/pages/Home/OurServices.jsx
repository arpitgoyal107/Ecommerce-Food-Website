import React from "react";

const serviceList = [
  {
    id: 1,
    title: "Catering",
    description:
      "We offer catering services for all kinds of events, from weddings to corporate parties.",
    image: "/images/home/services/icon1.png",
  },
  {
    id: 2,
    title: "Fast Delivery",
    description:
      "We provide fast delivery services to your doorstep so you can enjoy our food at home.",
    image: "/images/home/services/icon2.png",
  },
  {
    id: 3,
    title: "Online ordering",
    description:
      "Order your food online and get it delivered to your doorstep in no time.",
    image: "/images/home/services/icon3.png",
  },
  {
    id: 4,
    title: "Gift cards",
    description:
      "Purchase gift cards for your loved ones and let them enjoy our delicious food.",
    image: "/images/home/services/icon4.png",
  },
];

const OurServices = () => {
  return (
    <div className="section-container py-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        {/* text */}
        <div className="md:w-1/2">
          <div className="text-left md:max-w-[600px] px-4">
            <p className=" section-subHeading uppercase">
              Our Story & Services
            </p>
            <h2 className=" section-heading capitalize">
              Our Culinary journey And Services
            </h2>

            <p className="my-5 text-secondary leading-[30px]">
              Rooted in passion, we curate unforgettable dining experiences and
              offer exceptional services, blending culinary artistry with a warm
              hospitality.
            </p>

            <button className="btn bg-green text-white rounded-full py-3 px-8">
              Explore
            </button>
          </div>
        </div>

        {/* image */}
        <div className="md:w-1/2 ">
          <div className="grid sm:grid-cols-2 gap-8 items-center px-4">
            {serviceList.map((service) => (
              <div
                key={service.id}
                className="space-y-2 shadow-md py-5 px-4 bg-white rounded-sm text-center cursor-pointer hover:border-green transition-all duration-200 hover:border"
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-16 h-16 mx-auto"
                />

                <h3 className="text-xl font-semibold pt-3 text-green">
                  {service.title}
                </h3>

                <p className="text-[#90BD95]">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
