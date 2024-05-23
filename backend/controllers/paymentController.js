import axios from "axios";
import { getTimestamp } from "../utils/timestamp";
import  'dotenv/config';

export async function generateToken (req, res, next ) {
  const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
  const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
  console.log("consumer key", CONSUMER_KEY)
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
    req.token = response.data.access_token;
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
  
    const payload = {
      BusinessShortCode: BUSINESS_SHORT_CODE,
      Password: password,
      Timestamp: getTimestamp(),
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: 174379,
      PhoneNumber: phone,
      CallBackURL: "https://5bb5-41-90-66-254.ngrok-free.app",
      AccountReference: "Rafiki rent payment",
      TransactionDesc: "Rafiki",
    };
  
    try {
      const response = await axios.post(
        "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
        payload,
        {
          headers: {
            Authorization: `Bearer ${req.token}`,
          },
        }
      );
      res.status(201).json({
        message: true,
        data: response.data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: "Failed",
        error: error.message,
      });
    }
  };