import React from 'react';

function Footer() {
  return (

    <footer className="bg-gray-900 text-white pt-10 w-full">
      <div className="w-full px-8 pb-8 flex flex-col md:flex-row justify-between">
        <div className="w-full md:w-2/6 mb-8 md:mb-0">
          <div className="flex items-center text-xl font-bold mb-4 text-yellow-500">
            <div className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center shadow-lg text-gray-900 font-bold">
              G
            </div>
            <span>Goldey's Market</span>
          </div>

          <p className="text-gray-400 text-sm leading-relaxed">
            The official student marketplace for the University of Minnesota community. Buy, sell, and trade with confidence.
          </p>
        </div>

        <div className="w-full sm:w-1/3 md:w-1/6" >
          <h4 className="text-lg font-semibold mb-4 text-yellow-500">Categories</h4>
          <ul className="space-y-2 text-sm">
            {/* === Put in the right directories below for each list item ==*/}
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Textbooks</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Electronics</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Furniture</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Clothing</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">School Supplies</a></li>
          </ul>
        </div>

        <div className="w-full sm:w-1/3 md:w-1/6">
          <h4 className="text-lg font-semibold mb-4 text-yellow-500">Support</h4>
          <ul className="space-y-2 text-sm">
            {/* === Put in the right directories below for each list item ==*/}
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Help Center</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Safety Guidelines</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Terms of Service</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Privacy Policy</a></li>
            <li><a href="" className="text-gray-400 hover:text-white transition duration-200">Contact Us</a></li>
          </ul>
        </div>

        <div className="w-full sm:w-1/3 md:w-1/6">
          <h4 className="text-lg font-semibold mb-4 text-yellow-500">Connect</h4>
          <div className="flex space-x-4 mb-3">
            {/* === Put in the right directories below for each list item ==*/}
            <a href="" className="text-gray-400 bg-gray-800 p-2 rounded-full hover:text-white transition duration-200 text-sm" aria-label='Facebook'>
              <img src="/facebook-outline-svgrepo-com.svg" alt="Facebook" className="w-6 h-6 hover:opacity-80 transition" />
            </a>
            <a href="" className="text-gray-400 bg-gray-800 p-2 rounded-full hover:text-white transition duration-200 text-sm" aria-labe="Twitter">
              <img src="/twitter-outline-svgrepo-com.svg" alt="Twiiter" className="w-6 h-6 hover:opacity-80 transition" />
            </a>
            <a href="" className="text-gray-400 bg-gray-800 p-2 rounded-full hover:text-white transition duration-200 text-sm" aria-label="Instagram">
              <img src="/instagram-outline-svgrepo-com.svg" alt="Instagram" className="w-6 h-6 hover:opacity-80 transition" />
            </a>
          </div>
          <p className='text-gray-400 text-sm'>
            Follow us for updates and campus community news
          </p>
        </div>
      </div>


      <div className="border-t border-gray-700 py-4 px-4 sm:px-6 lg:px-8 text-sm flex flex-col sm:flow-row justify-between items-center text-grey-500 w-full">
        <p className="text-gray-400 text-center sm:text-left w-full sm:w-auto">
          © {new Date().getFullYear()} Goldy's Market. All rights reserved.
        </p>
        <p className="text-gray-400 text-center sm:text-right w-full sm:w-auto mt-2 sm:mt-0">
          Made with
          <span className='mx-1 text-red-500 text-lg'>❤️</span>
          for the University of Minnesota Community
        </p>
      </div>
    </footer>
  ); {/* ===<img src="/public/heart-svgrepo-com.svg" alt="Heart" className ="w-5 h-5 tranisiton"/>==*/ }
}

export default Footer; //
