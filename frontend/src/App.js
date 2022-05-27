/* eslint-disable no-unused-vars */
import logo from './logo.svg';
import './App.css';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

import { useEffect, useState } from "react";

import Model from "./Model.json";
// const modelAddress = "0x9131A184aA67a5aF62f24d82Eb1cFB06390D2c7A";
const modelAddress = "0x2f98e24bD505d135c28Fd981DD4dDF7b72338eF0";

function App() {

  const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  // state for keeping track of current connected account.
	const [account, setAccount] = useState(null);

  useEffect(() => {
		if (window.ethereum) {
			setIsWalletInstalled(true);
		}
	}, []);

  async function connectWallet() {
		window.ethereum
			.request({
				method: "eth_requestAccounts",
			})
			.then((accounts) => {
				setAccount(accounts[0]);
			})
			.catch((error) => {
				alert("Something went wrong");
			});

      await model();
	}

  async function model() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)    
    const signer = provider.getSigner()

    console.log('debug')


    let modelContract = new ethers.Contract(modelAddress, Model.abi, signer)
    console.log('debug2')
    let diskSize = await modelContract.diskSpace(1);
    // let getPrice = await modelContract.getPrice();
    // let calCost = await modelContract.calCost();
    console.log('debug3')
    // calCost = calCost.toString();
    let paymentInit = await modelContract.payment({ value: 1 });
    console.log('debug4')

    console.log(diskSize, paymentInit);
  }

    if (account === null) {
      return (
        <div className="App">
          { 
            isWalletInstalled ? (
              <button className="butt" onClick={model}>Connect Wallet</button>
            ) : (
              <p>Install Metamask wallet</p>
            )
          }

        </div>
      );
    }
      return (
        <div className="App"> 
          <p>Connected as: {account}</p>
        </div>
    ); 
  }
export default App;