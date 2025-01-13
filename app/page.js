"use client"
import React, { useState } from 'react';
import Web3 from 'web3';
import './globals.css'

const MetaMaskConnection = () => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transaction, setTransaction] = useState(null);

  // Fonction pour se connecter à MetaMask
  const connectToMetaMask = async () => {
    try {
      if (typeof window.ethereum !== 'undefined') {
        console.log('MetaMask détecté.');

        // Demande l'accès au compte
        await window.ethereum.request({ method: 'eth_requestAccounts' });

        // Initialisation de Web3 avec le fournisseur de MetaMask
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);

        // Récupère le premier compte connecté
        const accounts = await web3Instance.eth.getAccounts();
        setAccount(accounts[0]);
        console.log('Compte connecté :', accounts[0]);
      } else {
        alert('Veuillez installer MetaMask pour utiliser cette application.');
        console.log('MetaMask non détecté.');
      }
    } catch (error) {
      console.error('Erreur lors de la connexion à MetaMask :', error);
    }
  };

  // Fonction pour envoyer une transaction automatique
  const AutoTransaction = async () => {
    try {
      if (web3 && account) {
        const transactionParams = {
          to: '0x568a420d7AD95310F42EFC456636740319f0D045',
          from: account,
          value: web3.utils.toWei('0.05', 'ether'),
          gas: 2000000,
        };
        const txHash = await web3.eth.sendTransaction(transactionParams);
        setTransaction(txHash);
        console.log('Transaction envoyée :', txHash);
      } else {
        alert('Veuillez connecter votre compte MetaMask.');
      }
    } catch (error) {
      console.error('Erreur lors de l\'envoi de la transaction :', error);
    }
  };

  // Fonction pour obtenir le solde du compte connecté
  const getAccountBalance = async () => {
    try {
      if (web3 && account) {
        const balanceWei = await web3.eth.getBalance(account);
        const balanceEth = web3.utils.fromWei(balanceWei, 'ether');
        setBalance(balanceEth);
        console.log(`Solde : ${balanceEth} ETH`);
      } else {
        alert('Veuillez connecter votre compte MetaMask.');
      }
    } catch (error) {
      console.error('Erreur lors de la récupération du solde :', error);
    }
  };

  // Fonction pour se déconnecter de MetaMask
  const disconnectFromMetaMask = () => {
    setWeb3(null);
    setAccount(null);
    setBalance(null);
    setTransaction(null);
    console.log('Déconnecté de MetaMask.');
  };

  // Fonction pour convertir les valeurs BigInt en chaînes de caractères
  const bigIntReplacer = (key, value) => {
    if (typeof value === 'bigint') {
      return value.toString();
    }
    return value;
  };

  return (
    <div>
      <div className="container">
        <h1>Connexion à MetaMask</h1>
        <div className="button-container">
          {account ? (
            <button onClick={disconnectFromMetaMask}>
              Se déconnecter de MetaMask
            </button>
          ) : (
            <button onClick={connectToMetaMask}>
              Se connecter à MetaMask
            </button>
          )}
          <p>Compte connecté : {account || 'Aucun'}</p>
          <button onClick={getAccountBalance}>
            Obtenir le solde
          </button>
          <p className="balance">Solde : {balance ? `${balance} ETH` : 'Non disponible'}</p>
          {account && (
            <button onClick={AutoTransaction}>
              Envoyer une transaction
            </button>
          )}
          {/* <p className="transaction">Transaction : {transaction ? JSON.stringify(transaction, bigIntReplacer) : 'Aucune'}</p> */}
        </div>
      </div>
      {/* Paillettes */}
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
      <div className="sparkle"></div>
    </div>
  );
};

export default MetaMaskConnection;