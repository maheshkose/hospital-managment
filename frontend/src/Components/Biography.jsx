import React from "react";

const Biography = ({ imgUrl }) => {
  return (
    <>
      
      <div className="container biography">
        <div className="banner">
          <img src={imgUrl} alt="about" />
        </div>
        <div className="banner">
          <p>Biography</p>
          <h3>who we are</h3>
          <p>
            At Zeecare, we believe healthcare should be seamless, compassionate,
            and accessible to all. Our mission is to bridge the gap between
            patients and providers through smart technology and personalized
            care.
          </p>
          <p>
            We’re not just a hospital—we’re a health partner. From appointment
            booking to medical records, our platform empowers patients to take
            control of their wellness journey.
          </p>
          <p>
            Doctors and staff at Zeecare are equipped with cutting-edge tools to
            deliver efficient, empathetic, and high-quality care every step of
            the way.
          </p>
          <p>
            Driven by innovation and guided by empathy, Zeecare is redefining
            how hospitals serve communities. We combine medical excellence with
            digital convenience to ensure better outcomes for every patient.
          </p>
          <p>
            Because at the heart of every diagnosis, every treatment, and every
            recovery—there’s a story. And we’re here to care for yours.
          </p>
          <p>Zeecare: Where compassion meets innovation.</p>
        </div>
      </div>
    </>
  );
};

export default Biography;
