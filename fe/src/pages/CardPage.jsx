import { Link } from "react-router-dom";

function Card() {
  return (
    <div class="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white shadow-white">
      <img className="w-full" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxRPzNnDH8tN_lgEu93-jYUao6ARpfk7FSCw&s" alt = "table"/>
      <div class="px-6 py-4">
        <div class="font-bold text-3xl text-gray-700 mb-2">Home Table</div>
        <div className="flex justify-between text-gray-700">
          <p class="text-left text-4xl font-extrabold">89.00$ {/*price goes here*/}</p>
          <p className="text-4xl text-wrap "> Seller:{/* Authors name goes here */} </p> 
        </div>
      </div>
      <div className="flex justify-between text-2xl">
        <p className="m-4 grow rounded-2xl size-10 bg-black text-white font-bold"> Add Cart </p>
        <p className="m-4 grow rounded-2xl bg-blue-700 hover:bg-blue-800 hover:shadow-2xl">Buy</p>
      </div>
    </div>
  );
}


export default Card;