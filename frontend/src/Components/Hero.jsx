import React from "react";

const Hero = ({ title, imgUrl }) => {
  return (
    <>
      <div className="hero container">
        <div className="banner">
          <h1>{title}</h1>
          
            <p>
              Welcome to Zeecare — where modern technology meets compassionate
              healthcare. We’re committed to making your medical journey smooth,
              secure, and centered around you.
            </p>
            <p>
              From booking appointments to accessing records, Zeecare empowers
              patients and professionals with smart, reliable tools for better
              care and faster recovery.
            </p>
            <p>
              Your health deserves more than just treatment — it deserves
              attention, innovation, and heart. That’s what Zeecare delivers,
              every day.
            </p>
          
          <p>Zeecare: Smarter care. Stronger outcomes.</p>

        </div>
        <div className="banner">
          <img src={imgUrl} alt="hero" className="animated-image" />
          <span>
            <img src="/image/Vector.png" alt="vector" />
          </span>
        </div>
      </div>
    </>
  );
};

export default Hero;
