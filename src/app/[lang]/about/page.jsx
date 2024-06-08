const AboutUs = () => {
  return (
    <div className=" lw:prose-2 prose mx-auto py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">About Us</h2>
        <p className="mb-8 text-lg">
          Welcome to <span className="font-bold">LWSKart</span>, your one-stop
          destination for all your shopping needs! {`We're`} a dynamic
          e-commerce platform designed to offer you a seamless and enjoyable
          online shopping experience. Our mission is to bring you the best
          products at the best prices, with a focus on quality, variety, and
          customer satisfaction.
        </p>
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold">Our Story</h3>
          <p className="text-lg">
            LWSKart was founded with a simple idea: to make shopping more
            accessible and enjoyable for everyone. We believe that everyone
            deserves to find what they need, when they need it, and at a price
            that fits their budget. With this vision in mind, we have curated a
            diverse range of products that cater to all your needs, from fashion
            and beauty to electronics and home essentials.
          </p>
        </div>
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold">Our Values</h3>
          <ul className="list-disc pl-4">
            <li className="mb-2">
              Customer-Centric: Our customers are at the heart of everything we
              do.
            </li>
            <li className="mb-2">
              Quality Assurance: We are committed to offering high-quality
              products.
            </li>
            <li className="mb-2">
              Innovation: We embrace the latest technology and trends.
            </li>
            <li className="mb-2">
              Integrity: Transparency and honesty are the pillars of our
              business.
            </li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold">Why Choose LWSKart?</h3>
          <ul className="list-disc pl-4">
            <li className="mb-2">Wide Range of Products</li>
            <li className="mb-2">Competitive Pricing</li>
            <li className="mb-2">Fast and Reliable Shipping</li>
            <li className="mb-2">Secure Shopping</li>
          </ul>
        </div>
        <div className="mb-8">
          <h3 className="mb-4 text-2xl font-bold">Our Commitment</h3>
          <p className="text-lg">
            At LWSKart, we are dedicated to continuous improvement. We value
            your feedback and are always looking for ways to enhance your
            shopping experience. Your satisfaction is our success, and we look
            forward to serving you for years to come.
          </p>
        </div>
        <div>
          <h3 className="mb-4 text-2xl font-bold">Contact Us</h3>
          <p className="mb-2 text-lg">
            Have any questions or need assistance? Our friendly customer service
            team is here to help!
          </p>
          <p className="mb-2 text-lg">Email: support@lwskart.com</p>
          <p className="mb-2 text-lg">Phone: +1-234-567-890</p>
          <p className="mb-2 text-lg">
            Address: 123 Shopping Lane, Commerce City, CA 12345
          </p>
          <p className="mb-8 text-lg">
            Follow us on social media for the latest updates, promotions, and
            more!
          </p>
          <div className="flex">
            <a href="facebook.com/lwskart" className="mr-4">
              <i className="fab fa-facebook-f text-2xl"></i>
            </a>
            <a href="instagram.com/lwskart" className="mr-4">
              <i className="fab fa-instagram text-2xl"></i>
            </a>
            <a href="twitter.com/lwskart">
              <i className="fab fa-twitter text-2xl"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
