
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap'

const About = () => {


  const aboutRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(
      aboutRef.current,
      { opacity: 0, x: 50 },
      { opacity: 1, x: 0, duration: 1, ease: 'power2.out' }
    );
  }, []);


  return (
    <div className="min-h-screen px-6 py-10 text-gray-800 opa">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-green-600 mb-4 " ref={aboutRef}>About Us</h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold text-green-700">FreshBasket</span> – your one-stop online grocery store.
          We are dedicated to bringing you the freshest fruits, vegetables, dairy, and daily essentials right to your doorstep.
          Our mission is to make grocery shopping easy, quick, and affordable — so you can spend less time in traffic and more time doing what you love.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Why Choose Us?</h2>
        <ul className="list-disc list-inside mb-6 space-y-1 text-base">
          <li>✅ Fresh and quality products sourced directly from farmers and suppliers.</li>
          <li>✅ Fast and contactless home delivery.</li>
          <li>✅ Competitive prices and daily discounts.</li>
          <li>✅ Easy returns and secure payments.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Our Vision</h2>
        <p className="text-base leading-relaxed mb-6">
          We aim to revolutionize the way people shop for groceries by offering a convenient, reliable, and eco-friendly solution.
          With technology at our core and customer satisfaction as our goal, we’re growing to serve more cities every day.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mb-2">Contact Us</h2>
        <p className="text-base">
          📧 support@freshbasket.com <br />
          📞 +91 9876543210 <br />
          🏬 Pune, Maharashtra, India
        </p>
      </div>
    </div>
  );
};

export default About;
