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
        <div></div>
        {/*Searching tool */}
        <div id="Credibility-section"></div>

      </main>
    </div>
  );
}

export default HomePage;
