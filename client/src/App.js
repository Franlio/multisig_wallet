import React, { useEffect, useState } from 'react';
import { getWeb3, getWallet } from './utils.js';
import Header from './Header.js';
import NewTransfer from './NewTransfer.js';
import TransferList from './TransferList.js';
import { Navbar, Container, Spinner } from 'react-bootstrap'

function App() {
  const [web3, setWeb3] = useState(undefined);
  const [accounts, setAccounts] = useState(undefined);
  const [wallet, setWallet] = useState(undefined);
  const [approvers, setApprovers] = useState(undefined);
  const [quorum, setQuorum] = useState(undefined);
  const [transfers, setTransfers] = useState([]);

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const wallet = await getWallet(web3);
      const approvers = await wallet.methods.getApprovers().call();
      const quorum = await wallet.methods.quorum().call();
      const transfers = await wallet.methods.getTransfers().call();
      setWeb3(web3);
      setAccounts(accounts);
      setWallet(wallet);
      setApprovers(approvers);
      setQuorum(quorum);
      setTransfers(transfers);
    };
    init();
  }, []);

  const createTransfer = transfer => {
    wallet.methods
      .createTransfer(transfer.amount, transfer.to)
      .send({ from: accounts[0] });
  }

  const approveTransfer = transferId => {
    wallet.methods
      .approveTransfer(transferId)
      .send({ from: accounts[0] });
  }

  if (
    typeof web3 === 'undefined'
    || typeof accounts === 'undefined'
    || typeof wallet === 'undefined'
    || typeof approvers === 'undefined'
    || typeof quorum === 'undefined'
  ) {
    return (
      <div className="d-flex justify-content-center" >
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <>
      <div>
        <Navbar>
          <Container>
            <Navbar.Brand href="#home">Multisig Wallet</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                Created by: <a href="https://www.linkedin.com/in/franlio/">Frank Liao</a>
              </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <div className="w-100 p-3">
        <Header approvers={approvers} quorum={quorum} />
      </div>
      <div className="w-50 p-3">
        <NewTransfer createTransfer={createTransfer} />
      </div>
      <div className="w-75 p-3">
        <TransferList transfers={transfers} approveTransfer={approveTransfer} />
      </div>
    </>
  );
}

export default App;