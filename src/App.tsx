import React, { useState } from "react";
import { ethers } from "ethers";
import contractAbi from "./contractAbi.json";
import { Maybe } from "@metamask/providers/dist/utils";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const contractAddr = "0x3739100c7Fcc8a06b0eaC29Af9bc39819263ED09";

function App() {
  const [currentAccount, setCurrentAccount] = useState<string | null>(null);
  const ethereum = window.ethereum;

  const connectWalletHandler = async () => {
    
    if (!ethereum) {
      toast.warning("Please install Metamask!!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      try {
        const accounts: Maybe<string[]> = await ethereum.request({
          method: "eth_requestAccounts",
        });
    

        if (accounts) {
          if (typeof accounts[0] === 'string'){
            setCurrentAccount(accounts[0]);
            // Toastify
            toast.success("✔️ Wallet connected!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }
        }
      } catch (err) {
        toast.error("An error occured!", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  const mintNftHandler = () => {
    try {
      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const nftContract = new ethers.Contract(
          contractAddr,
          contractAbi,
          signer
        );
        console.log("Initialize payment");
          nftContract.claimReward().then(() => {
            toast.success("✔️ Transaction Successfull!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
          }).catch ((e:any)=>{
            toast.error("Transaction Failed!", {
              position: "bottom-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            })
          }
        )
      }
       else {
        toast.error('Ethereum object does not exist!', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
      }
    } catch (err) {
      console.log(err);
      toast.error('An error occured!', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    }
  };

  return (
    <>
      <div className="bg-black w-full h-screen flex flex-col items-center justify-center space-y-4">
        <h1 className="font-bold text-white text-xl text-center -top-10">
          Click button to {currentAccount ? 'claim reward' : 'connect wallet'}
        </h1>

        {currentAccount ? (
          <button
            onClick={mintNftHandler}
            className="bg-green-400 text-white px-4 py-2 -top-10 font-semibold"
          >
            Claim Rewards
          </button>
        ) : (
          <button
            onClick={connectWalletHandler}
            className="bg-blue-600 text-white px-4 py-2 -top-10 font-semibold"
          >
            Connect Wallet
          </button>
        )}
      </div>
      <ToastContainer />
    </>
  );
}

export default App;
