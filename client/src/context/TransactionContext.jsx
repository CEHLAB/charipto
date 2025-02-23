/* eslint-disable react/prop-types */
import React , {useEffect, useState} from 'react';
import { ethers } from 'ethers';
import { contractABI, contractAddress } from '../utils/constants';

export const TransactionContext = React.createContext();

const { ethereum } = window;

const getEthereumContract = () => {
    if (typeof window !== "undefined" && window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const transactionContract = new ethers.Contract(contractAddress, contractABI, signer);
      return transactionContract;
    } else {
      console.error("MetaMask non détecté");
      return null;
    }
  };
  


export const TransactionProvider = ({ children }) => {
    const [currentAccount, setCurrentAccount] = useState("");
    const [formData, setFormData] = useState({ addressTo:'', amount:'',keyword:'',message:'' });
    const handleChange = (e, name) => {
        setFormData((prevState) => ({ ...prevState, [name]: e.target.value }));
    }

    const checkIfWalletIsConnected = async () => {
        try {
          if (!ethereum) {
           return alert("MetaMask not detected");
            
          }
          
          const accounts = await ethereum.request({ method: "eth_accounts" });
          if (accounts.length) {
            setCurrentAccount(accounts[0]);
            
          }
          else {
            console.log("No account found");
          }
        } catch (error) {
          console.error(error);
        }
      }

    const connectWallet = async () => {
        try {
          if (!ethereum) {
            alert("Please install MetaMask!");
            return;
          }
          const accounts = await ethereum.request({ method: "eth_requestAccounts" });
          setCurrentAccount(accounts[0]);
          console.log(accounts);
        } catch (error) {
          console.error(error);
          alert("Failed to connect wallet. Please try again.");
        }
        ;

      }
      const sendTransaction = async () => {
        try {
          if (!ethereum) {
            alert("Please install MetaMask!");
            return;
          }
          const { addressTo, amount, keyword, message } = formData;
          getEthereumContract();

        } catch (error) {
          console.error(error);
          alert("Failed to send transaction. Please try again.");
      }
    }
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    return (
        <TransactionContext.Provider value={{ connectWallet, currentAccount , formData, handleChange, setFormData , sendTransaction}}>
            {children}
        </TransactionContext.Provider>
    )
}