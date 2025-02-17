import React, { useState } from "react";
import Calendar from "react-calendar";
import { useNavigate } from "react-router-dom";

//Define variables for dropdown menus. These could be saved in MongoDB instead to make them updateable in a UI element.
const services = [
  "Haircut",
  "Hair Coloring",
  "Deep Conditioning",
  "Bridal Styling",
  "Event Styling",
];

const stylists = ["Emily Johnson", "Michael Lee", "Sarah Brown"];

const Booking = () => {
  //Define state variables for form elements.

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(new Date());
  const [service, setService] = useState("");
  const [stylist, setStylist] = useState("");

  const navigate = useNavigate();

  //Handle form submission, preventing all default HTML actions.

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/bookings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, date, service, stylist }),
    });

    //Tell the customer the booking was successful and redirect them back home.
    if (response.ok) {
      alert(
        `Booking for ${name} on ${date.toLocaleDateString()} was successful. We will send an email to ${email} with available times.`
      );
      navigate("/");
    } else {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div>
      <h2>Book an Appointment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          {/* Calendar component goes here */}

          <label>Date: </label>
          <Calendar onChange={setDate} value={date} required />
          <p>Selected Date : {date.toLocaleDateString()}</p>
        </div>
        <div>
          <label htmlFor="service">Services :</label>
          <select
            id="service"
            value={service}
            onChange={(e) => setService(e.target.value)}
            required
          >
            <option value="" disabled>
              Select a service
            </option>
            {services.map((service, index) => (
              <option key={index} value={service}>
                {service}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="stylist">Stylist :</label>
          <select
            id="stylist"
            value={stylist}
            onChange={(e) => setStylist(e.target.value)}
          >
            <option value="" disabled>
              Select a stylist (optional)
            </option>
            {stylists.map((stylists, index) => (
              <option key={index} value={stylists}>
                {stylists}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Book</button>
      </form>
    </div>
  );
};

export default Booking;
