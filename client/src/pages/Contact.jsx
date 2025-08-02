"use client";

import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { gsap } from "gsap";
import emailjs from "@emailjs/browser";
import bgVid from "/bgVid.mp4"; // Path to your video

function Contact() {
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    relationship: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // GSAP Animations
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, delay: 0.3 });
      if (formRef.current) {
        gsap.fromTo(formRef.current.children, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, delay: 0.6 });
      }
    });
    return () => ctx.revert();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error on input change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.companyName.trim()) newErrors.companyName = "Company name is required";
    if (!formData.relationship) newErrors.relationship = "Please select a relationship";
    if (!formData.message.trim()) newErrors.message = "Message is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Replace with your EmailJS service details
      emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData, "YOUR_USER_ID").then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          alert("Your message has been sent successfully!");
          setFormData({
            firstName: "", lastName: "", email: "", phoneNumber: "",
            companyName: "", relationship: "", message: "",
          });
          setErrors({});
        },
        (error) => {
          console.error("Error sending email:", error);
          alert("There was an error sending your message. Please try again.");
        }
      );
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen text-white overflow-hidden">
      <video
        className="fixed top-0 left-0 w-full h-full object-cover opacity-30 -z-10"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={bgVid} type="video/mp4" />
      </video>

      <main className="relative z-10 flex flex-col lg:flex-row justify-center items-center w-full max-w-6xl px-4 sm:px-6 md:px-8 lg:px-16 space-y-10 lg:space-y-0 lg:space-x-12">
        {/* Contact Info Section */}
        <div className="bg-black/40 backdrop-blur-md border border-white/10 text-white p-8 sm:p-10 rounded-2xl w-full lg:w-2/5 max-w-lg shadow-2xl">
          <h2 ref={titleRef} className="text-3xl font-thin sm:text-4xl font-Montserrat mb-8 text-white">
            Get In Touch  
          </h2>
          <div className="space-y-6 text-base">
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faPhone} className="text-cyan-400 w-5" />
              <p>+91-9990547098</p>
            </div>
            <div className="flex items-center space-x-4">
              <FontAwesomeIcon icon={faEnvelope} className="text-cyan-400 w-5" />
              <p>support@techkrate.com</p>
            </div>
            <div className="flex items-start space-x-4">
              <FontAwesomeIcon icon={faLocationDot} className="text-cyan-400 w-5 mt-1" />
              <p>416, Sector 1, Vasundhara, Ghaziabad - 201012 Delhi NCR</p>
            </div>
            <div className="flex space-x-5 pt-4">
              <a href="https://www.linkedin.com/company/techkrate/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-300 transition-colors">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
              <a href="https://www.youtube.com/@techkrate4281" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-300 transition-colors">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="bg-black/40 backdrop-blur-md text-gray-100 p-8 sm:p-10 rounded-2xl w-full lg:w-3/5 max-w-2xl shadow-2xl border border-white/10">
          <form ref={formRef} onSubmit={sendEmail} className="space-y-6" noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="relative">
                <input
                  type="text" name="firstName" value={formData.firstName} onChange={handleInputChange}
                  className={`peer w-full bg-transparent text-white border-b-2 ${errors.firstName ? 'border-red-500' : 'border-gray-600'} focus:border-cyan-400 outline-none px-1 py-2 transition-colors duration-300`}
                  required
                />
                <label className={`absolute left-1 transition-all duration-300 pointer-events-none ${formData.firstName ? "-top-5 text-xs text-cyan-400" : "top-2 text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400"}`}>
                  First Name *
                </label>
                {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
              </div>
              {/* Last Name */}
              <div className="relative">
                <input
                  type="text" name="lastName" value={formData.lastName} onChange={handleInputChange}
                  className={`peer w-full bg-transparent text-white border-b-2 ${errors.lastName ? 'border-red-500' : 'border-gray-600'} focus:border-cyan-400 outline-none px-1 py-2 transition-colors duration-300`}
                  required
                />
                <label className={`absolute left-1 transition-all duration-300 pointer-events-none ${formData.lastName ? "-top-5 text-xs text-cyan-400" : "top-2 text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400"}`}>
                  Last Name *
                </label>
                {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
              </div>
            </div>
            {/* Email */}
            <div className="relative pt-2">
              <input
                type="email" name="email" value={formData.email} onChange={handleInputChange}
                className={`peer w-full bg-transparent text-white border-b-2 ${errors.email ? 'border-red-500' : 'border-gray-600'} focus:border-cyan-400 outline-none px-1 py-2 transition-colors duration-300`}
                required
              />
              <label className={`absolute left-1 transition-all duration-300 pointer-events-none ${formData.email ? "-top-5 text-xs text-cyan-400" : "top-2 text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400"}`}>
                Email *
              </label>
              {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
            </div>
            {/* Phone Number */}
            <div className="relative pt-2">
              <input
                type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}
                className="peer w-full bg-transparent text-white border-b-2 border-gray-600 focus:border-cyan-400 outline-none px-1 py-2 transition-colors duration-300"
              />
              <label className={`absolute left-1 transition-all duration-300 pointer-events-none ${formData.phoneNumber ? "-top-5 text-xs text-cyan-400" : "top-2 text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400"}`}>
                Phone Number (Optional)
              </label>
            </div>
            {/* Company Name */}
            <div className="relative pt-2">
              <input
                type="text" name="companyName" value={formData.companyName} onChange={handleInputChange}
                className={`peer w-full bg-transparent text-white border-b-2 ${errors.companyName ? 'border-red-500' : 'border-gray-600'} focus:border-cyan-400 outline-none px-1 py-2 transition-colors duration-300`}
                required
              />
              <label className={`absolute left-1 transition-all duration-300 pointer-events-none ${formData.companyName ? "-top-5 text-xs text-cyan-400" : "top-2 text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400"}`}>
                Company Name *
              </label>
              {errors.companyName && <p className="text-red-500 text-xs mt-1">{errors.companyName}</p>}
            </div>
            {/* Relationship */}
            <div className="relative pt-2">
              <label className={`absolute left-1 -top-5 text-xs transition-all duration-300 ${formData.relationship ? "text-cyan-400" : "text-gray-400"}`}>
                Relationship with Techkrate *
              </label>
              <select
                name="relationship" value={formData.relationship} onChange={handleInputChange}
                className={`w-full bg-transparent text-white border-b-2 ${errors.relationship ? 'border-red-500' : 'border-gray-600'} focus:border-cyan-400 outline-none px-0 py-2 transition-colors duration-300 appearance-none cursor-pointer`}
                required
              >
                <option value="" disabled className="bg-[#0B1121]">Select Relationship...</option>
                <option value="Potential Customer" className="bg-[#0B1121]">Potential Customer</option>
                <option value="Customer" className="bg-[#0B1121]">Customer</option>
                <option value="Financial Analyst" className="bg-[#0B1121]">Financial Analyst</option>
                <option value="Industry Analyst" className="bg-[#0B1121]">Industry Analyst</option>
                <option value="Investor" className="bg-[#0B1121]">Investor</option>
                <option value="Journalist" className="bg-[#0B1121]">Journalist</option>
                <option value="Alliance Partner" className="bg-[#0B1121]">Alliance Partner</option>
                <option value="Job Seeker" className="bg-[#0B1121]">Job Seeker</option>
                <option value="Other" className="bg-[#0B1121]">Other</option>
              </select>
              <div className="pointer-events-none absolute right-2 top-4 text-gray-400">
                <svg className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
              </div>
              {errors.relationship && <p className="text-red-500 text-xs mt-1">{errors.relationship}</p>}
            </div>
            {/* Message */}
            <div className="relative pt-2">
              <textarea
                name="message" value={formData.message} onChange={handleInputChange}
                className={`peer w-full bg-transparent text-white border-b-2 ${errors.message ? 'border-red-500' : 'border-gray-600'} focus:border-cyan-400 outline-none px-1 py-2 transition-colors duration-300 resize-none`}
                rows="3" required
              ></textarea>
              <label className={`absolute left-1 transition-all duration-300 pointer-events-none ${formData.message ? "-top-5 text-xs text-cyan-400" : "top-2 text-gray-400 peer-focus:-top-5 peer-focus:text-xs peer-focus:text-cyan-400"}`}>
                Message *
              </label>
              {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-cyan-500 text-black font-bold py-3 px-4 rounded-lg hover:bg-cyan-400 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-opacity-50"
            >
              Send Message
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Contact;
