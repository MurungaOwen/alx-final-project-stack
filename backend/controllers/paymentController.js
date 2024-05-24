import axios from "axios";
import 'dotenv/config';

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
  const HOST = process.env.HOST;

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
    PartyB: BUSINESS_SHORT_CODE, // owners number but we use this to test
    PhoneNumber: phone, // tenants nnumber still
    CallBackURL: `${HOST}/processpayment`, // where to send data after 
    // for callback url im using; ngrok for free https
    AccountReference: "Rafiki rent payment",
    TransactionDesc: "Rafiki",
  };

  try {
    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      {
        headers: {
          'Authorization': `Bearer ${req.token}`,
        },
      }
    );
    res.status(201).json({ message: true, data: response.data });

  } catch (error) {
    res.status(500).json({ message: "Failed", error: error.message});
  }
}


export async function processPayment(req, res) {
  const callbackData = req.body;
  console.log(callbackData);
  // Process the callback data as needed
  if (callbackData.Body && callbackData.Body.stkCallback) {
    const stkCallback = callbackData.Body.stkCallback;
    const callbackMetadata = stkCallback.CallbackMetadata;
    if (callbackMetadata && callbackMetadata.Item) {
      //sucess payment
      const mpesaCode = callbackMetadata.Item[1].Value;
      const amount = callbackMetadata.Item[0].Value;
      const phone = callbackMetadata.Item[3].Value;
      return res.status(200).json({ success: true, mpesaCode, amount, phone});
    }
    return res.status(403).json({ error: "payment incomplete" });
  }
  return res.status(403).json({"error": "payment incomplete"});
}
