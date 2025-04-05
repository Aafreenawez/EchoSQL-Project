import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white p-6">
      
      {/* Background Effect */}
      <div className="absolute inset-0 bg-[url('/background.jpg')] bg-cover bg-center opacity-30"></div>
      
      {/* Content */}
      <div className="relative z-10 max-w-4xl w-full bg-gray-800/60 backdrop-blur-lg rounded-2xl shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-6 text-blue-400">Contact Us</h1>
        
        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-8">
          <div className="flex flex-col items-center">
            <Mail className="w-10 h-10 text-blue-400 mb-2" />
            <p className="text-gray-300">EchoSQL@example.com</p>
          </div>
          <div className="flex flex-col items-center">
            <Phone className="w-10 h-10 text-green-400 mb-2" />
            <p className="text-gray-300">+91 223 456 7890</p>
          </div>
          <div className="flex flex-col items-center">
            <MapPin className="w-10 h-10 text-red-400 mb-2" />
            <p className="text-gray-300">Bengaluru,India</p>
          </div>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input 
              type="text" 
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your Name" 
              className="w-full p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-400 transition"
              required 
            />
          </div>
          <div className="relative">
            <input 
              type="email" 
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your Email" 
              className="w-full p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-400 transition"
              required 
            />
          </div>
          <div className="relative">
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Feedback" 
              rows="4"
              className="w-full p-4 bg-gray-900/50 rounded-lg border border-gray-700 text-white focus:outline-none focus:border-blue-400 transition"
              required 
            ></textarea>
          </div>
          <button 
            type="submit"
            className="w-full bg-blue-500 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
