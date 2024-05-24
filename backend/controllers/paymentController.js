import axios from "axios";
import  'dotenv/config';

// TODO: look at why env variables are not being accessed;
export async function generateToken (req, res, next ) {

  // generate token for identification at safaricom
  const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;

  const URL = "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials";

  const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString(
    "base64"
  );

  try {
    const response = await axios.get(URL, {
      headers: {
        Authorization: `Basic ${auth}`,
      },
    });
    req.token = response.data.access_token; // get token
    next(); // execute next function

  } catch (error) {
    throw new Error(`Failed to generate access token: ${error.message}`);
  }
};


export async function handleStkPush (req, res) {
    const { phone, amount } = req.body;
  
    const BUSINESS_SHORT_CODE = process.env.BUSINESS_CODE;
  
    const password = Buffer.from(
      BUSINESS_SHORT_CODE + process.env.MPESA_PASS_KEY + getTimestamp()
    ).toString("base64");
    // password created by making business till number and time of transaction and our pass key
  
    const payload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: getTimestamp(),
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone, // tenant number
      PartyB: 174379, // owners number but we use this to test
      PhoneNumber: phone, // tenants nnumber still
      CallBackURL: "", // where to send client after success 
      AccountReference: "Rafiki rent payment",
      TransactionDesc: "Rafiki",
    };
  
    try {
      const stkpush = "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest"
      const response = await axios.post(
        stkpush,
        payload,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      res.status(201).json({ message: true, data: response.data });

    } catch (error) {
      res.status(500).json({ message: "Failed", error: error.message});
    }
  };


function parseDate(val) {
  return (val < 10) ? "0" + val : val;
}

const getTimestamp = ()=>{

    const dateString  = new Date().toLocaleString("en-us", {timeZone: "Africa/Nairobi"});
    const dateObject = new Date(dateString);
    const month  = parseDate(dateObject.getMonth() + 1);
    const day  = parseDate(dateObject.getDate());
    const hour = parseDate(dateObject.getHours());
    const minute = parseDate(dateObject.getMinutes());
    const second = parseDate(dateObject.getSeconds());
    return dateObject.getFullYear() + "" + month + "" + day + "" + hour + "" + minute + "" + second;
}