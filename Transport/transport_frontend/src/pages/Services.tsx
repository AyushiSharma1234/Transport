import React from "react";

export const Services = () => {
  const services = [
    {
      id: 1,
      title: "Local Transportation",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget.",
    },
    {
      id: 2,
      title: "Interstate Transport",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget.",
    },
    {
      id: 3,
      title: "Specialized Cargo Handling",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget.",
    },
  ];

  return (
    <div className="services-page">
      <h1>Truck Transport Services</h1>
      <div className="services-list">
        {services.map((service) => (
          <div key={service.id} className="service-item">
            <h2>{service.title}</h2>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
