import "./form.css";
import React, { useState } from "react";
import { doc, collection, setDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../Config/firebase-config";

function Form() {
    const [name, setName] = useState("");
  const [comment, setComment] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await setDoc(doc(db, "submissions", name), {
        Name: name,
        Comment: comment,
        timestamp: serverTimestamp(),
      });
      setFormSubmitted(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="form">
        <h1 className="form-head">
          Got something to say?<br></br>Drop a line
        </h1>
        {formSubmitted ? (
          <div className="message">
            <p>Thank you for your Submission!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
            className="form-input"
              type="text"
              placeholder="Name (If Prefer)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /><br></br>
            <textarea required
            className="form-input"
              type="text"
              placeholder="Comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            /><br></br>

            <button className="form-btn" type="submit">Submit</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Form;
