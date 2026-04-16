import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Users } from 'lucide-react';

const Events = () => {
  const events = [
    { date: 'March 15, 2025', title: 'HFMA Annual Conference', location: 'Las Vegas, NV', type: 'Conference' },
    { date: 'April 10, 2025', title: 'RCM Innovation Summit', location: 'Virtual', type: 'Webinar' },
    { date: 'May 5, 2025', title: 'Medical Coding Workshop', location: 'Chicago, IL', type: 'Workshop' },
  ];

  return (
    <div className="pt-24 pb-16">
      <section className="bg-gradient-to-r from-dark to-primary text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <Calendar className="w-20 h-20 mx-auto mb-6 text-accent" />
          <h1 className="text-5xl font-bold mb-4">Upcoming Events</h1>
          <p className="text-xl text-blue-100">Join us at industry conferences, webinars, and workshops.</p>
        </div>
      </section>
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          {events.map((event, idx) => (
            <div key={idx} className="bg-white rounded-xl shadow-md p-6 mb-4">
              <div className="flex flex-wrap justify-between items-center">
                <div><div className="text-primary font-bold">{event.date}</div><h3 className="text-xl font-bold text-dark">{event.title}</h3><div className="flex gap-4 mt-2 text-gray-500 text-sm"><span><MapPin size={14} className="inline" /> {event.location}</span><span><Users size={14} className="inline" /> {event.type}</span></div></div>
                <button className="bg-primary text-white px-4 py-2 rounded-lg">Register →</button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Events;