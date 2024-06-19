import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

export const ReviewAccountTransactions = () => {
    const [transactions, setTransactions] = useState([]);
    const [accountid, setAccountid] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useDispatch();
    const { info } = useSelector((state) => state.adminAuth);

    const [roleDetails, setRoleDetails] = useState('')

   
 
    useEffect(() => {
        // console.log(info)
        setRoleDetails(info.role)

        // console.log("roleDetails",roleDetails)
        const fetchPendingTransactions = async () => {
            setIsLoading(true);
            setError('');
            try {
                const response = await axios.get("http://localhost:5001/test/reviewStatus1", {
                  headers: {
                    "Content-Type": "application/json"
                  },
                });
                if (response && response.data && Array.isArray(response.data)) {
                    let allIncomingTransactions = [];
                    response.data.forEach(account => {
                        setAccountid(account._id)
                        if (account.out && Array.isArray(account.out)) {
                            // console.log("inside",info.role)
                            const filteredTransactions = account.out.filter(tx => {
                                return tx.status === 'pending' &&
                                  ((info.role === 'manager' && tx.balance_transfered > 10000) ||
                                   (info.role === 'admin' && tx.balance_transfered <= 10000)
                                   || ((info.role === 'owner')));
                            });
                            allIncomingTransactions = allIncomingTransactions.concat(filteredTransactions);
                        }
                    });
                    setTransactions(allIncomingTransactions);
                } else {
                    setTransactions([]);
                }
                
            } catch (err) {
                setError('Failed to fetch transactions. Please try again.');
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPendingTransactions();
    }, []);
  
    // const handleApproveReject = async (accountId, transactionId, newStatus, transaction) => {
    //     setIsLoading(true);
    //     try {
    //         setTransactions(transactions.filter(tx => tx._id !== transactionId));

    //         const response = await axios.post('http://localhost:5001/test/updateTransactionsStatus', {
    //             accountId,
    //             transactionId,
    //             status: newStatus,
    //             receiveId: transaction.to,
    //             balanceTransfered: transaction.balance_transfered,
    //             correspondingTransactionId: transaction.correspondingTransactionId
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //         });

    //         if (response.status === 200) {
    //             setTransactions(transactions.map(tx => 
    //                 tx._id === accountId ? { ...tx, status: newStatus } : tx
    //             ));
    //             alert(`Transaction ${newStatus}. Please refresh the page.`);
    //         } else {
    //             throw new Error('Failed to update transaction status');
    //         }
    //     } catch (error) {
    //         setError('Failed to update transaction status. Please try again.');
    //         console.error(error);
    //     } finally {
    //         setIsLoading(false);
    //     }
    // };

    const handleApproveReject = async (accountId, transactionId, newStatus, transaction) => {
        setIsLoading(true);
        try {
            // Optimistically remove the transaction from the UI
            const filteredTransactions = transactions.filter(tx => tx._id !== transactionId);
            setTransactions(filteredTransactions);
    
            const response = await axios.post('http://localhost:5001/test/updateTransactionsStatus', {
                accountId,
                transactionId,
                status: newStatus,
                receiveId: transaction.to,
                balanceTransfered: transaction.balance_transfered,
                correspondingTransactionId: transaction.correspondingTransactionId
            }, {
                headers: {
                    "Content-Type": "application/json"
                },
            });
    
            if (response.status !== 200) {
                throw new Error('Failed to update transaction status');
            }
    
            alert(`Transaction ${newStatus}.`);
        } catch (error) {
            setError('Failed to update transaction status. Please try again.');
            console.error(error);
            // Re-add the transaction that failed to update back to the transactions list
            setTransactions([...transactions, transaction]);
        } finally {
            setIsLoading(false);
        }
    };
    
    
    

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;
 
    return (
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1 style={{ color: '#333', fontSize: '24px', marginBottom: '20px' }}>Pending Transactions for Approval</h1>
            {transactions.length > 0 ? (
                transactions.map(transaction => (
                    <div key={transaction._id} style={{ margin: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', backgroundColor: '#f9f9f9' }}>
                        <p style={{ fontSize: '16px', color: '#555' }}>Transaction from {accountid} to {transaction.to} of ${transaction.balance_transfered}. Status: {transaction.status}</p>
                        <button style={{ padding: '10px 20px', marginRight: '10px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', color: 'white', backgroundColor: '#4CAF50' }} onClick={() => handleApproveReject(accountid, transaction._id, 'approved', transaction)} disabled={isLoading || transaction.status !== 'pending'}>
                            Approve
                        </button>
                        <button style={{ padding: '10px 20px', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', color: 'white', backgroundColor: '#f44336' }} onClick={() => handleApproveReject(accountid, transaction._id, 'rejected', transaction)} disabled={isLoading || transaction.status !== 'pending'}>
                            Reject
                        </button>
                    </div>
                ))
            ) : (
                <p>No pending transactions found.</p>
            )}
        </div>
    );
};
 
export default ReviewAccountTransactions;