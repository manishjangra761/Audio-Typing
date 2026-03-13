import React, { useState } from 'react'
import { MdLocationPin, MdCall, MdEmail } from "react-icons/md";
import { FaPaperPlane } from 'react-icons/fa';
import axios from '../../services/api';
import { toast } from 'react-toastify';

const ContactArea = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });


  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const data = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        form_type: "feedback"
      };

      await axios.post("/contact", data);

      toast.success("Message sent successfully!");

      setSubmitted(true);

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitted(false);
      }, 3000);

    } catch (err) {
      console.log(err);
      toast.error("Failed to send message");
    }
  };


  return (
    <section className='w-full px-4 md:px-8 lg:px-12 py-20 md:py-32 space-y-16'>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16 space-y-4 animate-fadeInUp">
          <h2 className="text-5xl md:text-6xl font-bold text-white">
            Get in Touch
          </h2>
          <p className="text-xl text-neutral-300">
            Have questions? We'd love to hear from you. Send us a message!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Contact Info Cards */}
          <div className="md:col-span-1 space-y-4">
            {[
              {
                icon: MdLocationPin,
                title: "Location",
                content: "ABC XYZ ROAD, CITY\nHaryana, INDIA"
              },
              {
                icon: MdCall,
                title: "Phone",
                content: "+91 9876543212"
              },
              {
                icon: MdEmail,
                title: "Email",
                content: "support@audiotyping.com"
              }
            ].map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="glass-card p-6 rounded-2xl space-y-3 hover:glass-light smooth-transition group animate-fadeInUp"
                  style={{ animationDelay: `${0.1 + idx * 0.1}s` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:bg-primary-500/40 smooth-transition">
                    <Icon className="w-6 h-6 text-primary-400 group-hover:text-primary-300" />
                  </div>
                  <h3 className="font-semibold text-white text-sm">{item.title}</h3>
                  <p className="text-neutral-400 text-sm whitespace-pre-line">{item.content}</p>
                </div>
              );
            })}
          </div>

          {/* Contact Form */}
          <div className="md:col-span-2">
            <div className="glass-card p-8 md:p-12 rounded-2xl space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold text-white">Feedback Form</h3>

              {submitted ? (
                <div className="bg-green-500/20 border border-green-500/50 rounded-xl p-6 text-center space-y-2 animate-fadeIn">
                  <div className="text-4xl">✓</div>
                  <p className="text-green-400 font-semibold">Message sent successfully!</p>
                  <p className="text-green-300 text-sm">Thank you for reaching out. We'll get back to you soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="input-field w-full"
                      required
                    />
                  </div>

                  {/* Email Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                      className="input-field w-full"
                      required
                    />
                  </div>

                  {/* Phone Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">
                      Phone Number
                    </label>

                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 9876543210"
                      className="input-field w-full"
                      required
                    />
                  </div>


                  {/* Message Input */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-neutral-300">Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind..."
                      className="input-field w-full h-32 resize-none"
                      required
                    ></textarea>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn w-full py-3 flex items-center justify-center gap-2 font-semibold rounded-xl hover:glass-light smooth-transition"
                  >
                    <FaPaperPlane className="w-4 h-4" />
                    Send Message
                  </button>
                </form>
              )}

              <p className="text-xs text-neutral-400 text-center pt-4 border-t border-white/10">
                We respect your privacy. Your information will not be shared.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactArea
