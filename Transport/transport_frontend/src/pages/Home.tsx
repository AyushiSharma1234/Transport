import React from "react";
import truckImage1 from '../assets/images/truck1.jpg'
import truckImage2 from '../assets/images/truck2.jpg'
import truckImage3 from '../assets/images/truck3.jpg'
export const Home = () => {

  return (
    <>
      <div className="container">
        <div className="bossImage">
          {/* <img alt='main' src={truckImage3}/> */}
        </div>
        <h1 className="title">Truck Transport Information</h1>
        <p className="main-paragraph">
          Trucks are a popular means of transporting goods across various
          distances. They offer flexibility and can navigate through diverse
          terrains. Truck transport is a critical element of logistics, playing
          a pivotal role in supply chains worldwide. Trucks are widely used due
          to their ability to transport various goods efficiently. These
          vehicles come in different sizes and types, from small delivery trucks
          to large tractor-trailers capable of carrying substantial loads.
          They're suitable for short to medium-distance transportation needs,
          offering convenience and accessibility. Despite their versatility,
          truck transport faces challenges. High fuel consumption, especially
          for heavy loads and long distances, can significantly impact operating
          costs. Additionally, traffic congestion and road conditions affect
          delivery schedules, posing logistical challenges.
        </p>
        <div className="info-section">
          <h2>Advantages of Truck Transport:</h2>
          <ul>
            <li>Efficient for short to medium-distance transport.</li>
            <li>Versatile and can carry a wide range of goods.</li>
            <li>Adaptable to different road conditions.</li>
          </ul>
          <img src={truckImage1} alt="truck image 1" />
        </div>
        <div className="info-section">
          <h2>Challenges of Truck Transport:</h2>
          <ul>
            <li>High fuel consumption.</li>
            <li>Traffic and road congestion affecting delivery times.</li>
            <li>Maintenance costs for trucks.</li>
          </ul>
          <div className="image-row">
        <img src={truckImage2} alt="truck image 2" />
        <img src={truckImage3} alt="truck image 3" />
      </div>
        </div>
        <p className="closing-paragraph">
          Despite challenges, trucks remain an integral part of the global
          transportation network. Advances in technology and logistics continue
          to enhance their efficiency and sustainability, ensuring their
          continued significance in moving goods across regions and countries.
        </p>
      </div>
    </>
  );
};
