import React from 'react';

export const AboutUsPage = () => {
  return (
    <div className="about-us">
      <header>
        <h1>Welcome to Our Truck Transport Company</h1>
        <p>Reliable Transportation Solutions for Your Cargo Needs</p>
      </header>
      <section className="company-info">
        <h2>About Us</h2>
        <p>
          Our truck transport company is dedicated to delivering exceptional transportation services. We leverage our expertise to ensure that your goods are transported efficiently and securely to their destinations.
        </p>
        <p>
          With a focus on reliability and customer satisfaction, we offer a wide range of transportation options, including full truckload and less-than-truckload services. Our team is committed to meeting your specific shipping requirements.
        </p>
      </section>
      <section className="company-values">
        <h2>Our Values</h2>
        <ul>
          <li>
            <strong>Reliability:</strong> Timely and dependable deliveries.
          </li>
          <li>
            <strong>Safety:</strong> Ensuring secure handling of goods.
          </li>
          <li>
            <strong>Customer Focus:</strong> Prioritizing client needs and satisfaction.
          </li>
          <li>
            <strong>Efficiency:</strong> Streamlining transport operations for effectiveness.
          </li>
        </ul>
      </section>
      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <p>
          Our commitment to excellence sets us apart. We combine industry knowledge with modern logistics solutions to provide a seamless experience for our customers. Here are some reasons to choose our services:
        </p>
        <ul>
          <li>Experienced and professional team</li>
          <li>State-of-the-art equipment</li>
          <li>Customized transportation solutions</li>
          <li>24/7 customer support</li>
        </ul>
      </section>
      <section className="contact-info">
        <h2>Contact Us</h2>
        <p>If you have any questions or require our services, please don't hesitate to get in touch:</p>
        <p>Email: info@transportcompany.com</p>
        <p>Phone: +1 123-456-7890</p>
        <p>We look forward to serving you!</p>
      </section>
    </div>
  );
};

