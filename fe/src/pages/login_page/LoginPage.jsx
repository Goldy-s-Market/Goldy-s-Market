import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="flex justify-between items-center bg-white lg:bg-transparent z-10">
      <div className="flex items-center gap-2">
        { /* TODO: Update with goldy image */}
        <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
          <div className="w-4 h-4 bg-white rounded-full"></div>
        </div>
        <span className="text-xl font-bold text-[#7A0019]">Goldy's Market</span>
      </div>
      <Link
        to="/"
        className="text-gray-600 hover:text-gray-900 text-sm lg:text-base"
      >
        Back to Home
      </Link>
    </header>
  )
}

function Footer() {
  return (
    <footer className="flex flex-col gap-4 p-4 bg-gray-100 text-center">
      <div>
        Only current UMN students with @umn.edu Google accounts can access Goldy's Market
      </div>
      {/* TODO: Add appropriate links once done */}
      <div className="flex justify-center align-center gap-4 text-sm text-gray-600">
        <Link to="/">
          <div>
            Terms of Service
          </div>
        </Link>
        <Link to="/">
          <div>
            Privacy Policy
          </div>
        </Link>
      </div>
    </footer>
  )
}

function Main() {
  return (
    <div className="flex-1 flex flex-col justify-center align-center gap-3">
      <div className="flex flex-col justify-center align-center gap-1">
        <h1 className="text-3xl font-bold text-center mt-4">Join Goldy's Market</h1>
        <div className="text-center font-light">
          Sign in with your UMN account to get started
        </div>
      </div>
      <div className="flex p-4 gap-4 bg-blue-100 rounded-lg border border-blue-400 mx-5 my-6">
        <div className="flex shrink-0 justify-center align-center bg-blue-400 h-6 w-6 rounded-full text-white">
          i
        </div>
        <div className="text-md text-[#1E40AF]">
          We use your UMN Google account (@umn.edu) to verify student status and ensure a trusted community marketplace.
        </div>
      </div>
      <div className="flex justify-center align-center p-4 gap-4 rounded-lg border border-gray-300 mx-5 text-lg font-medium">
        <img src="google-color-svgrepo-com.svg" height={24} width={24} alt="G"></img>
        {/* TODO: Fill in the link or something */}
        <Link to="">
          <div>
            Continue with UMN Google Account
          </div>
        </Link>
      </div>
      <div className="text-center font-light text-gray-400">
        Secure authentication powered by Google
      </div>
      <div className="flex flex-col justify-center gap-2 mt-2">
        <div className="flex p-2 gap-3 rounded-lg mx-5 my-2 max-w-lg">
          <img src="tick-success-svgrepo-com.png" alt="tick mark" height={32} width={32} className="mt-1 h-10 w-10 shrink-0"></img>
          <div className="flex flex-col gap-1 text-md">
            <span className="font-bold text-lg">
              Automatic Verification
            </span>
            <span className="text-gray-900 font-light">
              UMN student status verified instantly with your @umn.edu email
            </span>
          </div>
        </div>
        <div className="flex p-2 gap-3 rounded-lg mx-5 my-2 max-w-lg">
          <img src="lock-svgrepo-com.png" alt="lock icon" height={30} width={30} className="mt-1 h-10 w-10 shrink-0"></img>
          <div className="flex flex-col gap-1 text-md">
            <span className="font-bold text-lg">
              Secure & private
            </span>
            <span className="text-gray-900 font-light">
              Protecte by Google's enterprise-grade security
            </span>
          </div>
        </div>
        <div className="flex p-2 gap-3 rounded-lg mx-5 my-2 max-w-lg">
          <img src="lightning-svgrepo-com.png" alt="ligntning icon" height={32} width={32} className="mt-1 h-10 w-10 shrink-0"></img>
          <div className="flex flex-col gap-1 text-md">
            <span className="font-bold text-lg">
              Quick Access
            </span>
            <span className="text-gray-900 font-light">
              One-click sign in - no passwords to remember or forms to fill
            </span>
          </div>
        </div>
      </div>
    </div >
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
    <div className="flex flex-1 flex-col justify-center lg:justify-start min-h-screen">
      <div className="p-5 lg:max-w-3xl flex flex-col flex-1 bg-white justify-start max-w-640px gap-4 ">
        <Header />
        <Main />
      </div>
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
