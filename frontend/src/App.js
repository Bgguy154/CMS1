import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";

function App() {
  const [contacts, setContacts] = useState([]);
  const baseURL=import.meta.env==="development" ? "http://localhost:5000/api/contacts":"/api/contacts"

  const fetchContacts = async () => {
    const res = await axios.get(baseURL);
    setContacts(res.data);
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <div className="app">
      <h1>Contact Management</h1>
      <div className="container">
        <ContactForm onSuccess={fetchContacts} />
        <ContactList contacts={contacts} />
      </div>
    </div>
  );
}

export default App;
