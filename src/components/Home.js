import React from 'react';
import './Home.css'; // Import the CSS file
 
function Home() {
  return (
    <div className="container">
      <h1 className="heading">AI Phone Calls.</h1>
      AUTOMATE YOUR PHONE CALLS WITH AI
      <hr className="line" />
 
      <textarea
        className="script-box"
        placeholder="Write your calling script here"
      ></textarea>
 
      <button className="submit-btn">Submit Script</button>
 
      {/* Box container for phone numbers and CSV */}
      <div className="number-container">
        <div className="input-fields">
          <input type="text" className="number-input" placeholder="Write number to call" />
          <input type="text" className="number-input" placeholder="Write number to call" />
          <input type="text" className="number-input" placeholder="Write number to call" />
          <input type="text" className="number-input" placeholder="Write number to call" />
          <input type="text" className="number-input" placeholder="Write number to call" />
        </div>
 
        {/* Plus sign */}
        <div className="add-more">
         
          <input type="file" accept=".csv" className="csv-input" />
        </div>
 
        {/* Call button */}
        <button className="submit-btn">Call</button>
      </div>
    </div>
  );
}
 
export default Home;
 