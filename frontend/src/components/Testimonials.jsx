import React, { useState } from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const [testimonials] = useState([
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      practice: "Family Health Clinic",
      rating: 5,
      content: "MahaStar has transformed our revenue cycle. Claims processing is faster, denials have dropped by 40%, and their team is always responsive. Best decision we made for our practice!",
      image: "https://randomuser.me/api/portraits/women/1.jpg"
    },
    {
      id: 2,
      name: "Michael Chen",
      practice: "Chen Medical Associates",
      rating: 5,
      content: "Exceptional service! The team at MahaStar helped us reduce our administrative costs by 30% while improving collection rates. Their IT support is top-notch.",
      image: "https://randomuser.me/api/portraits/men/2.jpg"
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      practice: "Pediatric Care Center",
      rating: 5,
      content: "Switching to MahaStar was the best business decision. Their RCM solutions are comprehensive, and we've seen a 25% increase in revenue within 6 months.",
      image: "https://randomuser.me/api/portraits/women/3.jpg"
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      practice: "Wilson Cardiology",
      rating: 4,
      content: "Very professional team. They handle everything from coding to claims follow-up. Our practice has never been more efficient. Highly recommended!",
      image: "https://randomuser.me/api/portraits/men/4.jpg"
    },
    {
      id: 5,
      name: "Lisa Thompson",
      practice: "Thompson Wellness Center",
      rating: 5,
      content: "The denial management service alone is worth it. They caught issues we didn't even know we had. Outstanding partner for medical billing.",
      image: "https://randomuser.me/api/portraits/women/5.jpg"
    }
  ]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-dark mb-4">What Our Clients Say</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Trusted by healthcare providers across UK & US
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.id} className="card hover:transform hover:scale-105 transition-all duration-300">
              <Quote className="w-10 h-10 text-primary mb-4 opacity-50" />
              <p className="text-gray-600 mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-dark">{testimonial.name}</h4>
                    <p className="text-sm text-gray-500">{testimonial.practice}</p>
                  </div>
                </div>
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-primary text-white rounded-xl p-8 text-center">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div>Client Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div>Healthcare Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">30%</div>
              <div>Average Revenue Increase</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;