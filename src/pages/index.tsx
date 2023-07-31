import styles from "@/styles/Home.module.css";
import { encodeURL } from "@solana/pay";
import { Keypair } from "@solana/web3.js";
import { useMemo, useState } from "react";
import QRCode from "react-qr-code";

const Home = () => {
  const [qrCode, setQrCode] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(0);
  const reference = useMemo(() => Keypair.generate().publicKey, []);

  const createPayment = async () => {
    if (!quantity) {
      return;
    }

    const apiUrl = `${process.env.NEXT_PUBLIC_APP_URL}/api/makeTransaction?amount=${quantity}&reference=${reference}`;

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
      <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">Coincha<span className=" md:text-4xl lg:text-5xl text-3xl font-bold mr-2 px-2.5 py-0.5 rounded bg-[#A0865D] text-gray-900 ml-2">STORE</span> 🥮 </h1>
<p className="mb-6 text-lg font-bold text-gray-600 lg:text-xl sm:px-16 xl:px-48 "> Select the amount of coinchas did you want to buy and click the button, <br/>
  then go to your phantom wallet, put on devnet, open the QR Scanner, and please be patient, </p><p className="mb-6 text-lg font-bold text-[#A0865D] lg:text-xl sm:px-16 xl:px-48 ">  Note: Put the QR exactly in the square :B </p>


        <input className="text-2xl font-bold mb-5 mt-5 bg-white text-gray-900 rounded-md text-center " placeholder="1"
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <br/>
        <button className="text-2xl font-bold px-5 py-5 mb-5 bg-gray-900 text-white rounded-md" onClick={createPayment}>Generate QR</button>
      </div>



      <div style={{ height: "auto", margin: "0 auto", maxWidth: 400
      , width: "100%" }}>
      {qrCode && <QRCode value={qrCode}
      size={520}
      style={{ height: "auto", maxWidth: "100%", width: "100%" }}
      
      viewBox={`0 0 520 520
      `} />}
      </div>
    </main>
  );
};

export default Home;
