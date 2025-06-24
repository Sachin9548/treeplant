import React from "react";
import { Link as ScrollLink } from "react-scroll"; // Import Link from react-scroll for smooth scrolling
import { Link } from "react-router-dom"; // Import Link from react-router-dom for Login and Verify Certificate
import heroBg from "../assets/b1.jpg";
import aboutImg from "../assets/impact.jpg";
import Navbar from "../components/Navbar";
import JoinForm from "../components/JoinForm";

export default function HomePage() {
  return (
    <div className="font-sans">
      <Navbar />
      {/* Hero Section */}
      <section
        id="home"
        className="relative bg-cover bg-center h-[80vh] flex items-center justify-center text-white text-center px-4"
        style={{ backgroundImage: `url(${heroBg})` }}
      >
        <div className="bg-black bg-opacity-60 p-8 rounded-xl pt-24">
          <h1 className="text-5xl font-bold mb-6">
            Join Our 15-Day Campaign for a Greener Future!
          </h1>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Be part of our tree plantation campaign and contribute to a
            sustainable planet. Help us create a greener future, one tree at a
            time.
          </p>
          <div className="space-x-4">
            {/* Updated to scroll to 'contact' section */}
            <ScrollLink to="contact" smooth={true} duration={500}>
              <button className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded font-semibold">
                Get Started
              </button>
            </ScrollLink>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="bg-gray-100 py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <img
            src={aboutImg}
            alt="About Green Earth Mission"
            className="w-full md:w-1/2 rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-4xl font-bold text-green-700 mb-6">
              Why Your Participation Matters
            </h2>
            <p className="text-gray-700 text-lg mb-6">
              Our planet is facing unprecedented environmental challenges, and
              we need your help! By joining our 15-day tree plantation drive,
              you can take action to help reduce deforestation, fight climate
              change, and make a meaningful contribution to the environment. You
              don’t need to travel; just plant one tree a day, capture a photo,
              and upload it.
            </p>
            <p className="text-gray-700 text-lg mb-6">
              It’s simple, free, and impactful! You will receive a certificate
              for your participation, which you can proudly share with your
              friends and family to inspire others to join the cause.
            </p>
            <ScrollLink to="programs" smooth={true} duration={500}>
              <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
                Learn More
              </button>
            </ScrollLink>
          </div>
        </div>
      </section>

      {/* Environmental Issues Section */}
      <section id="issues" className="bg-gray-200 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-8">
          Current Environmental Challenges
        </h2>
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          {[
            {
              title: "Deforestation",
              desc: "Every year, millions of trees are lost due to human activities, contributing to habitat loss, biodiversity reduction, and climate imbalance. Your tree planting can help reverse this.",
            },
            {
              title: "Pollution",
              desc: "Pollution affects ecosystems and human health. Planting trees helps absorb harmful pollutants and improves air quality, benefiting the entire community.",
            },
            {
              title: "Climate Change",
              desc: "Global warming intensifies extreme weather patterns, causing floods, droughts, and rising sea levels. Every tree you plant contributes to the fight against climate change.",
            },
          ].map((issue, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-green-700 mb-4">
                {issue.title}
              </h3>
              <p className="text-gray-600">{issue.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action - Join the 15-Day Campaign */}
      <section id="motivation" className="bg-green-200 py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-8">
          Make a Difference in Just 15 Days!
        </h2>
        <p className="text-xl mb-6 max-w-2xl mx-auto">
          Join us in our mission to make the Earth greener and healthier. Over
          15 days, you can plant a tree each day, take a picture, and upload it
          to our platform. It's that simple to contribute to the environment,
          and in return, you will receive a certificate of appreciation.
        </p>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
          Imagine millions of people planting trees every day! Your small action
          can lead to monumental positive change for the planet. Join today and
          share the message with your friends and family.
        </p>
        <ScrollLink to="contact" smooth={true} duration={500}>
          <button className="bg-green-700 text-white px-8 py-3 rounded hover:bg-green-800">
            Join the Mission
          </button>
        </ScrollLink>
      </section>

      {/* How to Join the Campaign Section */}
      <section id="programs" className="py-16 px-6 text-center">
        <h2 className="text-4xl font-bold text-green-700 mb-8">
          How to Join the Campaign
        </h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              title: "Plant One Tree per Day",
              desc: "Plant one tree each day for 15 days to help contribute towards the environment.",
            },
            {
              title: "Upload Your Photos",
              desc: "Take a photo of the tree you plant each day and upload it to our platform to track your progress.",
            },
            {
              title: "Get Your Certificate",
              desc: "Once you’ve uploaded all 15 photos, you’ll receive a certificate recognizing your efforts.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition"
            >
              <div className="text-3xl mb-4">🌿</div>
              <h3 className="text-xl font-bold mb-4 text-green-700">
                {item.title}
              </h3>
              <p className="text-gray-600 mb-4">{item.desc}</p>
              {/* <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">{item.btn}</button> */}
            </div>
          ))}
        </div>
      </section>

      {/* Statistics Section */}
      <section
        id="stats"
        className="bg-green-800 py-16 px-6 text-white text-center"
      >
        <h2 className="text-4xl font-bold mb-8">Our Impact So Far</h2>
        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            { num: "10,000", label: "Trees Planted" },
            { num: "300", label: "Students Helped" },
            { num: "200", label: "Interns Trained" },
            { num: "10", label: "Communities Served" },
          ].map((item, i) => (
            <div
              key={i}
              className="text-2xl font-bold bg-green-600 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <p>{item.num}</p>
              <p>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 px-6">
        <h2 className="text-4xl font-bold text-green-700 mb-8 text-center">
          What People Say
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            {
              name: "Akash Bhatiya",
              text: "The tree plantation drive was amazing. It was so rewarding to see the positive impact we made together!",
            },
            {
              name: "Riya Nerulkar",
              text: "I learned so much about environmental sustainability. Can't wait to join again next month!",
            },
          ].map((testimonial, i) => (
            <div
              key={i}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition w-full md:w-1/3"
            >
              <p className="text-gray-600 mb-4">{testimonial.text}</p>
              <p className="font-bold text-green-700">- {testimonial.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="bg-green-500 text-center py-16 px-6">
        <JoinForm />
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-10 px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-yellow-400 font-bold text-lg mb-2">
              Grow With Us
            </h3>
            <p className="text-sm">
              Empowering communities through sustainable action.
            </p>
          </div>
          <div>
            <h4 className="text-yellow-400 font-bold mb-2">Quick Links</h4>
            <ul className="text-sm space-y-1">
              <li>
                <ScrollLink
                  to="home"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer"
                >
                  Home
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="about"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer"
                >
                  About
                </ScrollLink>
              </li>
              <li>
                <ScrollLink
                  to="programs"
                  smooth={true}
                  duration={500}
                  className="cursor-pointer"
                >
                  Programs
                </ScrollLink>
              </li>
              <li>
                <Link to="/login" className="cursor-pointer">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-yellow-400 font-bold mb-2">Contact Us</h4>
            <p className="text-sm">📍 India</p>
            <p className="text-sm">✉️ info@growwithus.online</p>
          </div>
        </div>
        <div className="text-center text-sm text-gray-500 mt-10 border-t border-gray-700 pt-4">
          &copy; {new Date().getFullYear()} Grow With Us. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
