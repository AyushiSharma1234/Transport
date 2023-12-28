import React from "react";

export const Products = () => {
  const products = [
    {
      id: 1,
      name: "Flatbed Trailers",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget.",
    },
    {
      id: 2,
      name: "Refrigerated Trucks",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget.",
    },
    {
      id: 3,
      name: "Dry Vans",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget.",
    },
  ];

  return (
    <div className="products-page">
      <h1>Truck Transport Products</h1>
      <div className="products-list">
        {products.map((product) => (
          <div key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
