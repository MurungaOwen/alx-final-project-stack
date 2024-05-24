import axios from "axios";
import 'dotenv/config';
import getTimestamp from "./time.js";

export async function getMpesaToken(){
    const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
    const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
    const URL = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials'
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
        "base64"
    );

    const response = await axios.get(URL, {
        headers: {
          Authorization: `Basic ${auth}`,
        },
    })
    return response.data.access_token;
}

export async function stkPush(amount, phone, token) {
    const BUSINESS_SHORT_CODE = process.env.BUSINESS_CODE;
    const HOST = process.env.HOST;
  
    const password = Buffer.from(
      BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + getTimestamp()
    ).toString("base64");

    const payload = {
        BusinessShortCode: BUSINESS_SHORT_CODE,
        Password: password,
        Timestamp: getTimestamp(),
        TransactionType: "CustomerPayBillOnline",
        Amount: amount,
        PartyA: phone, // tenant number
        PartyB: BUSINESS_SHORT_CODE, // owners number but we use this to test
        PhoneNumber: phone, // tenants nnumber still
        CallBackURL: `${HOST}/api/pay/process`, // where to send data after 
        // for callback url im using; ngrok for free https
        AccountReference: "Rafiki rent payment",
        TransactionDesc: "Rafiki",
    };

    const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        payload,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }
      );
    return response.data
}