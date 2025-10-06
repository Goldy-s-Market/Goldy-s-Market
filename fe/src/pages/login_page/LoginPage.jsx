import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="p-4 lg:p-6 flex justify-between items-center bg-white lg:bg-transparent z-10">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <span className="text-lg font-semibold text-gray-900">Goldy's Market</span>
      </div>
      <Link
        to="/"
        className="text-gray-600 hover:text-gray-900 text-sm lg:text-base"
      >
        Back to Home
      </Link>
    </div>
  )
}

function Footer() {
  return (
    <footer>
      Stuff
    </footer>
  )
}

function Main() {
  return (
    <div>
      Main bit here
    </div>
  )
}

function LeftSection() {
  return (
    <div className="hidden lg:flex flex-1 flex-col bg-gradient-to-br from-maroon-900 to-maroon-800 relative justify-center items-center max-w-640px gap-4">

      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-24 h-24 border border-yellow-400 rounded-full opacity-50"></div>
      <div className="absolute top-18 right-20 w-16 h-16 border border-yellow-400  rounded-full opacity-50"></div>
      <div className="absolute bottom-20 left-16 w-20 h-20 border border-yellow-400 rounded-full opacity-50"></div>


      <div className="h-[288px] w-[256px]">
        <img src="/gopher_login.png" alt="gopher image" height={288} width={256} className="box-content overflow-hidden mb-8 grow-0 aspect-auto">
        </img>
      </div>
      <div className="w-md flex flex-col gap-4">
        <div className="text-5xl text-[#ffcc33] text-center font-bold leading-48px">
          Welcome Gophers!
        </div>
        <div className="text-xl text-white text-center leading-8">
          Join the trusted marketplace designed exclusively for University of Minnesota students. Connect, trade, and build community with fellow Gophers.
        </div>
      </div>
    </div>
  )
}

function RightSection() {
  return (
    <div className="flex flex-col flex-1 bg-white min-h-screen justify-start max-w-640px">
      <Header />
      <Main />
      <Footer />
    </div>
  )
}

function LoginPage() {
  return (
    <div className="flex min-h-screen min-w-screen bg-white font-display">
      <LeftSection />
      <RightSection />
    </div>
  );
}

export default LoginPage;
