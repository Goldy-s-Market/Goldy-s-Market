import { Link } from "react-router-dom";
import { Footer } from "../login_page/LoginPage";

function HomePage() {
  return (    
    <div className="bg-gray-50  flex justify-center b-24">
      {/*There is a responsive layout issue that needs to be fixed */}
      <div className="w-full max-w-7xl px-4">
        <div id="header-container" className="bg-white shadow-lg mx-auto max-w-7xl rounded-lg mt-8 mb-12">
          <header id="header" className="px-8 py-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              {/*Left */}
              <div className="flex items-center space-x-3">
                {/* Logo and text here */}
                <div className="w-12 h-12 bg-umn-gold rounded-full flex items-center justify-center shadow-md">
                  {/*Logo should go here*/}
                  <img></img>
                </div>
                <span className="text-2xl font-bold text-umn-maroon">Goldy's Market</span>
              </div>
              {/*right logo container */}
              <div className="flex items-center space-x-4">
                <Link to="/">
                  <button className="text-gray-700 hover:text-umn-maroon font-medium px-4 py-2 rounded-lg transition duration-200">Sign In</button>
                </Link>
                <Link to="/">
                  <button className="bg-umn-maroon hover:bg-red-800 text-white font-medium px-6 py-2 rounded-lg transition duration-200">Get Started</button>
                </Link>
              </div>
            </div>
          </header>
          
          <main id="hero-section" className="px-8 py-16 pb-24 text-center">
            <h1 className="text-6xl font-bold text-umn-maroon mb-6 leading-tight">Buy, Sell, Trade with
              <br/>
              Fellow Students
            </h1>
            <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">The trusted marketplace designed exclusively for University of Minnesota students.
              Connect with you campus community to buy, sell, and bid on everything you need for student life.
            </p>
            {/*Call to action buttons */}
            <div className="flex items-center justify-center space-x-4 mb-12">
              {/*Add on click events to new routes */}
              <Link to="/">
                <button className="bg-umn-maroon hover:bg-red-800 text-white font-semibold px-8 py-4 rounded-lg text-lg transition duration-200 shadow-md">Start Shopping</button>
              </Link>
              <Link to="/">
                <button className="border-2 border-umn-maroon text-umn-maroon hover:bg-umn-maroon hover:text-white font-semibold px-8 py-4 rounded-lg text-lg transition duration-200">List an Item</button>
              </Link>
            </div>
            {/*Searching tool */}
            <div id="search-section" className="max-w-2xl mx-auto mb-16">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  {/*Magnifying glass goes here */}
                  <i class="text-gray-400 w-5 h-5" data-fa-i2svg="">
                    <svg className="svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                      <path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path>
                    </svg>
                  </i>
                </div>
                <input type="text" className="w-full pl-12 pr-4 py-4 rounded-lg border-2 border-gray-200 focus:outline-none focus:ring-2 focus:ring-umn-maroon focus:border-transparent text-lg" placeholder="Search for textbooks, electronics, furniture, clothing, and more..." />
              </div> 
            </div>
            <div id="credibility-section" className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-umn-gold rounded-full flex items-center justify-center mb-4 shadow-md">{/*This is where the credit icon will be */}
                  <svg  className="w-8 h-8 text-umn-maroon" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="graduation-cap" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" data-fa-i2svg="">
                    <path fill="currentColor" d="M320 32c-8.1 0-16.1 1.4-23.7 4.1L15.8 137.4C6.3 140.9 0 149.9 0 160s6.3 19.1 15.8 22.6l57.9 20.9C57.3 229.3 48 259.8 48 291.9v28.1c0 28.4-10.8 57.7-22.3 80.8c-6.5 13-13.9 25.8-22.5 37.6C0 442.7-.9 448.3 .9 453.4s6 8.9 11.2 10.2l64 16c4.2 1.1 8.7 .3 12.4-2s6.3-6.1 7.1-10.4c8.6-42.8 4.3-81.2-2.1-108.7C90.3 344.3 86 329.8 80 316.5V291.9c0-30.2 10.2-58.7 27.9-81.5c12.9-15.5 29.6-28 49.2-35.7l157-61.7c8.2-3.2 17.5 .8 20.7 9s-.8 17.5-9 20.7l-157 61.7c-12.4 4.9-23.3 12.4-32.2 21.6l159.6 57.6c7.6 2.7 15.6 4.1 23.7 4.1s16.1-1.4 23.7-4.1L624.2 182.6c9.5-3.4 15.8-12.5 15.8-22.6s-6.3-19.1-15.8-22.6L343.7 36.1C336.1 33.4 328.1 32 320 32zM128 408c0 35.3 86 72 192 72s192-36.7 192-72L496.7 262.6 354.5 314c-11.1 4-22.8 6-34.5 6s-23.5-2-34.5-6L143.3 262.6 128 408z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-umn-maroon mb-2">Student Verified</h3>
                <p className="text-gray-600 text-center">All users verified with UMN email addresses</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-umn-gold rounded-full flex items-center justify-center mb-4 shadow-md">{/*This is where the credit icon will be */}
                  <svg  aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shield-halved" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-8 h-8 text-umn-maroon" data-fa-i2svg="">
                    <path fill="currentColor" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8V444.8C394 378 431.1 230.1 432 141.4L256 66.8l0 0z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-umn-maroon mb-2">Safe & Secure</h3>
                <p className="text-gray-600 text-center">Protected transactions and secure messaging</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-umn-gold rounded-full flex items-center justify-center mb-4 shadow-md">{/*This is where the credit icon will be */}
                  <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bolt" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" className="w-8 h-8 text-umn-maroon" data-fa-i2svg="">
                    <path fill="currentColor" d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-umn-maroon mb-2">Quick & Easy</h3>
                <p className="text-gray-600 text-center">List items in minutes, buy with one click</p>
              </div>
            </div>
          </main>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default HomePage;
