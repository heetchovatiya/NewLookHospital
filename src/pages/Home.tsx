import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Shield, Clock, Star, Award, Users, Heart, Phone } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-teal-500 to-teal-700 text-white">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-6xl mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Your Journey to<br />Radiant Skin Begins Here
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-teal-100">
              Experience world-class dermatological care with our expert team of specialists.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/book"
                className="bg-white text-teal-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors"
              >
                Book Appointment
              </Link>
              <a
                href="#about"
                className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose DermaClinic?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine expertise with cutting-edge technology to provide you with the best dermatological care.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Calendar className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Easy Scheduling</h3>
              <p className="text-gray-600">Book appointments online anytime, anywhere with our user-friendly system.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Shield className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Expert Care</h3>
              <p className="text-gray-600">Our board-certified dermatologists provide comprehensive skin care solutions.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Clock className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Timely Service</h3>
              <p className="text-gray-600">Automated reminders and follow-ups ensure you never miss an appointment.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <Star className="w-12 h-12 text-teal-600 mb-6" />
              <h3 className="text-xl font-semibold mb-3">Special Offers</h3>
              <p className="text-gray-600">Exclusive promotions and loyalty rewards for our valued patients.</p>
            </div>
          </div>
        </div>
      </div>

      {/* About Us */}
      <div id="about" className="py-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                About DermaClinic
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                With over 15 years of experience, DermaClinic has been at the forefront of dermatological excellence. 
                Our state-of-the-art facility combines cutting-edge technology with compassionate care to deliver 
                the best results for our patients.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <Award className="w-8 h-8 text-teal-600" />
                  <div>
                    <h4 className="font-semibold">Certified</h4>
                    <p className="text-gray-600">Board Certified</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-8 h-8 text-teal-600" />
                  <div>
                    <h4 className="font-semibold">Experience</h4>
                    <p className="text-gray-600">15+ Years</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-teal-600" />
                  <div>
                    <h4 className="font-semibold">Satisfied</h4>
                    <p className="text-gray-600">10K+ Patients</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-8 h-8 text-teal-600" />
                  <div>
                    <h4 className="font-semibold">Rating</h4>
                    <p className="text-gray-600">4.9/5 Stars</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=800"
                alt="Modern clinic interior"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="flex items-center gap-4">
                  <Phone className="w-10 h-10 text-teal-600" />
                  <div>
                    <p className="text-sm text-gray-600">Call Us Now</p>
                    <p className="text-lg font-semibold">1-800-DERMA-CARE</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive dermatological care for all your skin health needs.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Medical Dermatology',
                description: 'Treatment for skin conditions including acne, eczema, and psoriasis.',
                image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Cosmetic Procedures',
                description: 'Advanced treatments for skin rejuvenation and anti-aging.',
                image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800'
              },
              {
                title: 'Skin Cancer Screening',
                description: 'Early detection and treatment of skin cancer.',
                image: 'https://images.unsplash.com/photo-1581093458791-9d42e3c2fd45?auto=format&fit=crop&q=80&w=800'
              }
            ].map((service, index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-teal-600 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Skin?
          </h2>
          <p className="text-xl mb-8">
            Schedule your consultation today and take the first step towards healthier, more radiant skin.
          </p>
          <Link
            to="/book"
            className="bg-white text-teal-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-teal-50 transition-colors inline-block"
          >
            Book Your Appointment
          </Link>
        </div>
      </div>
    </div>
  );
}