import { FC } from 'react'
import styles from '../styles/Home.module.css'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import * as Web3 from '@solana/web3.js'

export const SendSolForm: FC = () => {

 const { connection } = useConnection();
 const { publicKey, sendTransaction } = useWallet();   

     

    const sendSol = event => {
        event.preventDefault()
        //console.log(`Send ${event.target.amount.value} SOL to ${event.target.recipient.value}`)
        if(!connection || !publicKey ) {
            alert('Please connect your wallet ')
            return
        }
        
        const transaction = new Web3.Transaction()
        const sendSolInstruction =  Web3.SystemProgram.transfer(
            {
            fromPubkey: publicKey,
            toPubkey:  new Web3.PublicKey(event.target.recipient.value),
            lamports: event.target.amount.value
        }
        )
        transaction.add(sendSolInstruction)
        sendTransaction(transaction, connection).then(sig => {
            console.log(`You can view your transaction on the solana explorer at: \nhttps://explorer.solana.com/tx/${sig}?cluster=devnet`)
        })
    }

    return (
        <div>
            <form onSubmit={sendSol} className={styles.form}>
                <label htmlFor="amount">Amount (in SOL) to send:</label>
                <input id="amount" type="text" className={styles.formField} placeholder="e.g. 0.1" required />
                <br />
                <label htmlFor="recipient">Send SOL to:</label>
                <input id="recipient" type="text" className={styles.formField} placeholder="e.g. 4Zw1fXuYuJhWhu9KLEYMhiPEiqcpKd6akw3WRZCv84HA" required />
                <button type="submit" className={styles.formButton}>Send</button>
            </form>
        </div>
    )
}