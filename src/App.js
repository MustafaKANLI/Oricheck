import { ethers } from 'ethers';
import Oricheck from './artifacts/contracts/Oricheck.sol/Oricheck.json';
import { useRef, useState, useEffect } from 'react';
import './App.css';
import { Container, Grid, Stack, Typography, Button, TextField, Divider, Alert } from '@mui/material';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

function App() {
  const [account, setAccount] = useState(null);
  const productHistRef = useRef();
  const addProdRef = useRef();
  const addTxProdRef = useRef();
  const recvRef = useRef();

  const [error, setError] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    (async () => {
      if (!window.ethereum) {
        console.error('Metamask not installed');
        return;
      }

      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
        console.log(accounts[0]);
      } catch (e) {}
    })();
  }, []);

  const fetchContract = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) console.error('Ethereum object does not exist');

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, Oricheck.abi, signer);

      return contract;
    } catch (e) {
      console.error(e);
    }
  };

  const addProduct = async () => {
    const serial = addProdRef.current.value;
    if (!serial) return;

    try {
      const contract = await fetchContract();
      await contract.addProduct(serial);
      setError('');
    } catch (e) {
      setError(e.response?.data ?? e.reason ?? 'An error occured');
    }
  };

  const addTransaction = async () => {
    const serial = addTxProdRef.current.value;
    const receiver = recvRef.current.value;

    if (!serial || !receiver) return;

    try {
      const contract = await fetchContract();
      await contract.transferProduct(serial, receiver);
      setError('');
    } catch (e) {
      setError(e.response?.data ?? e.reason ?? 'An error occured');
    }
  };

  const getHistory = async () => {
    const serial = productHistRef.current.value;
    if (!serial) return;

    try {
      const contract = await fetchContract();
      const data = await contract.getProductHistory(serial);
      setHistory(data);
      setError('');
    } catch (e) {
      setHistory([]);
      setError(e.response?.data ?? e.reason ?? 'An error occured');
    }
  };

  return (
    <Container sx={{ py: 1 }}>
      {error && (
        <Alert severity="error" onClose={() => setError('')}>
          {error}
        </Alert>
      )}
      <Grid container sx={{ p: 5, py: 1 }}>
        <Grid item xs={5.5} sx={{ p: 2, border: '5px solid #00000044', borderRadius: '8px', minHeight: '480px' }}>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="center">
              <Typography variant="h6">Product Transaction History</Typography>
            </Stack>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
              <TextField fullWidth id="asd" label="Product Serial" variant="outlined" inputRef={productHistRef} />
              <Button variant="contained" onClick={getHistory}>
                Refresh
              </Button>
            </Stack>
            <Divider />
            <Stack spacing={1} sx={{ overflowY: 'auto', maxHeight: 430 }}>
              {history.map((hist, idx) => {
                return (
                  <Stack key={idx} sx={{ p: 1, border: '5px solid #00000044', borderRadius: '8px' }}>
                    <Typography sx={{ overflowX: 'scroll', whiteSpace: 'nowrap' }}>{`Owner(${idx + 1}): ${hist}`}</Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Grid>
        <Grid item xs={1} />
        <Grid item xs={5.5}>
          <Stack spacing={2}>
            <Stack spacing={2} sx={{ p: 2, border: '5px solid #00000044', borderRadius: '8px' }}>
              <Stack direction="row" justifyContent="center">
                <Typography variant="h6">Add New Product</Typography>
              </Stack>
              <TextField id="addps" label="Product Serial" variant="outlined" inputRef={addProdRef} />
              <Button variant="contained" onClick={addProduct}>
                Add
              </Button>
            </Stack>
            <Stack spacing={2} sx={{ p: 2, border: '5px solid #00000044', borderRadius: '8px' }}>
              <Stack direction="row" justifyContent="center">
                <Typography variant="h6">Add New Transaction</Typography>
              </Stack>
              <TextField id="Product Serial" label="Product Serial" variant="outlined" inputRef={addTxProdRef} />
              <TextField id="Receiver Public Key" label="Receiver Public Key" variant="outlined" inputRef={recvRef} />
              <Button variant="contained" onClick={addTransaction}>
                Add
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
