import styles from "@/styles/Home.module.css";
import { encodeURL } from "@solana/pay";
import { Keypair } from "@solana/web3.js";
import { useMemo, useState } from "react";
import QRCode from "react-qr-code";


const Home = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const reference = useMemo(() => Keypair.generate().publicKey, []);
  const copyrightLabel = `©${new Date().getFullYear()} CoinchaShop.`;

  const createPayment = async () => {
    if (!quantity) {
      return;
    }

    const apiUrl = `${process.env.VERCEL_URL}/api/makeTransaction?amount=${quantity}&reference=${reference}`;

    const urlParams = {
      link: new URL(apiUrl),
      label: "Superteam MX Coincha Redeem",
      message: "Thanks for buying our coinchas!",
    };
    const solanaUrl = encodeURL(urlParams);
    setQrCode(solanaUrl.href);
  };


  return (

    <main className="flex flex-col min-h-screen justify-center items-center text-center bg-[#FFF5D4] ">
      <title>CoinchaShop™</title>
      <div>
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Coincha
          <span className=" md:text-4xl lg:text-5xl text-3xl font-bold mr-2 px-2.5 py-0.5 rounded bg-[#A0865D] text-gray-900 ml-2">SHOP</span> 🥮 </h1>
        <p className="mb-6 text-lg font-bold text-gray-600 lg:text-xl sm:px-16 xl:px-48 ">
          Select the amount of coinchas did you want to buy and click the button,
          <br />
          then go to your phantom wallet, put on devnet, open the QR Scanner, and please be patient. </p>
        <p className="mb-6 text-lg font-bold text-[#A0865D] lg:text-xl sm:px-16 xl:px-48 ">  Note: Put the QR exactly in the square 🤓 </p>



        <input className="text-2xl font-bold mb-5 mt-5 bg-white text-gray-900 rounded-md text-center " placeholder="1"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <br />

        <button className="text-2xl font-bold px-5 py-5 mb-5 bg-gray-900 text-white rounded-md" onClick={createPayment}>Generate QR</button>
        <p className="mb-6 text-lg font-bold text-[#A0865D] lg:text-sm sm:px-16 xl:px-48 ">  Minimum Amount 1</p>
      </div>


      <div style={{
        height: "auto", margin: "0 auto", maxWidth: 400
        , width: "100%"
      }}>
        {qrCode && <QRCode value={qrCode}
          size={520}
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}

          viewBox={`0 0 520 520
      `} />}
      </div>
      <footer className="fixed bottom-0">
        <div className="mx-auto max-w-7xl py-12 px-6 flex  space-x-4">

          <div className="mt-8 md:order-1 md:mt-0">
            <p className="text-center text-base text-[#A0865D]">
              {copyrightLabel}
            </p>
          </div>
          <div className="flex justify-center md:order-2 space-x-4">
            <a
              key="github"
              href="https://github.com/Avzolem"

            >
              <div className="iconcontainer h-6 w-6 cursor-pointer text-[#A0865D]  hover:text-black">

                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <title>Github</title>
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
              </div>
            </a>


            <a
              key="twitter"
              href="https://twitter.com/avsolem"

            >
              <div className="iconcontainer h-6 w-6 cursor-pointer text-[#A0865D]   hover:text-black">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <title>Twitter</title>
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                </svg>
              </div>
            </a>

            <a
              key="instagram"
              href="https://instagram.com/avsolem"

            >
              <div className="iconcontainer h-6 w-6 cursor-pointer text-[#A0865D]   hover:text-black">
                <svg
                  role="img"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <title>Instagram</title>
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z" />
                </svg>
              </div>
            </a>





          </div>

        </div>
      </footer>
    </main>


  );
};

export default Home;
