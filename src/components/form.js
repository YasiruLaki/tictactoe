import "./form.css";
import React, { useState } from "react";

function Form() {
  const [order, setOrder] = useState(""); // Initialize order state

  const handleChange = (event) => {
    // Update the 'order' state with the input value
    setOrder(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const myForm = event.target;
    const formData = new FormData(myForm);

    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData).toString(),
    })
      .then(() => alert("Thank you for your submission"))
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <h1 className="form-head">
          Got something to say?<br></br>Drop a line
        </h1>
        <form
          data-netlify="true"
          name="pizzaOrder"
          method="post"
          onSubmit={handleSubmit}
        >
          <input type="hidden" name="form-name" value="pizzaOrder" />
          <label>
            What order did the pizza give to the pineapple?
            <input name="order" type="text" value={order} onChange={handleChange} />
          </label>
          <input type="submit" />
        </form>
      </div>
    </div>
  );
}

export default Form;
