import SendMessage from "./SendMessage";

const ContactUs = () => {
  return (
    <div className=" py-16 ">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-3xl font-bold">Contact Us</h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h3 className="mb-4 text-2xl font-bold">Get in Touch</h3>
            <p className="mb-4 text-lg">
              Have a question, comment, or suggestion? {`We'd`} love to hear
              from you! Use the contact form below to reach out to us.
            </p>
            <div>
              <div className="mb-4">
                <label htmlFor="name" className="mb-2 block text-lg">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="mb-2 block text-lg">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-black focus:bg-white focus:outline-none"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="message" className="mb-2 block text-lg">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="4"
                  className="w-full rounded-md border border-gray-300 bg-gray-100 px-4 py-2 text-black focus:bg-white focus:outline-none"
                ></textarea>
              </div>

              <SendMessage />
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-2xl font-bold">Contact Information</h3>
            <p className="mb-4 text-lg">
              Have a question or need assistance? Our customer service team is
              here to help!
            </p>
            <ul className="mb-4">
              <li className="mb-2 flex items-center">
                <i className="fas fa-envelope mr-2"></i> support@lwskart.com
              </li>
              <li className="mb-2 flex items-center">
                <i className="fas fa-phone-alt mr-2"></i> +1-234-567-890
              </li>
              <li className="mb-2 flex items-center">
                <i className="fas fa-map-marker-alt mr-2"></i> 123 Shopping
                Lane, Commerce City, CA 12345
              </li>
            </ul>
            <p className="text-lg">
              Connect with us on social media for the latest updates,
              promotions, and more!
            </p>
            <div className="mt-4 flex">
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
    </div>
  );
};

export default ContactUs;
