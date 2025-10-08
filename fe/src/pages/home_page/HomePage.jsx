import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div>
      <header>
        <div>
          {/*Right header buttons */}
          <div >
            {/* Button components go here */}
          </div>
          {/*Left logo container */}
          <div>
            {/*Image goes here */}
            <h2>Goldy's Market</h2>
          </div>
        </div>
      </header>
      
      <main id="hero-section">
        <h1>Buy, Sell, Trade with
          <br>Fellow Students</br></h1>
        <p>The trusted marketplace designed exclusively for University of Minnesota students.
          Connect with you campus community to buy, sell, and bid on everything you need for student life.
        </p>
        {/*Call to action buttons */}
        <div>
          <button>Start Shopping</button>
          <button>List an Item</button>
        </div>
        {/*Searching tool */}
        <div>
          <div>
            <div>{/*Magnifying glass goes here */}</div>
            <input type="text" placeholder="Search for textbooks, electronics, furniture, clothing, and more...">
            </input>
          </div> 
        </div>
        <div id="credibility-section">
          <div>
            <div>{/*This is where the credit icon will be */}
              
            </div>
            <h3>Student Verified</h3>
            <p>All users verified with UMN email addresses</p>
          </div>
          <div>
            <div>{/*This is where the credit icon will be */}</div>
            <h3>Safe & Secure</h3>
            <p>Protected transactions and secure messaging</p>
          </div>
          <div>
            <div>{/*This is where the credit icon will be */}</div>
            <h3>Quick & Easy</h3>
            <p>List items in minutes, buy with one click</p>
          </div>
        </div>

      </main>
    </div>
  );
}

export default HomePage;
