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
    <main className={styles.main}>
      <div>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
        <button onClick={createPayment}>Generate QR</button>
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
