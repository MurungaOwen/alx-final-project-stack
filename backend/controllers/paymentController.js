import { getMpesaToken, stkPush } from "../utils/pay.js";

export async function generateToken (req, res, next ) {
  try {
    const token = await getMpesaToken();
    req.token = token; // set token
    next(); // execute next controller

  } catch (error) {
    throw new Error(`Failed to generate access token: ${error}`);
  }
};

export async function handleStkPush (req, res) {
  const { phone, amount } = req.body;

  try {
    const response = await stkPush(amount, phone, req.token);
    res.status(201).json({ message: true, data: response.ResponseDescription });

  } catch (error) {
    res.status(500).json({ message: "Failed", error: error});
  }
}


export async function processPayment(req, res) {
  const callbackData = req.body;
  console.log("here",callbackData)
  // Process the callback data as needed
  if (callbackData.Body && callbackData.Body.stkCallback) {
    const stkCallback = callbackData.Body.stkCallback;
    const callbackMetadata = stkCallback.CallbackMetadata;
    if (callbackMetadata && callbackMetadata.Item) {
      //sucess payment
      const mpesaCode = callbackMetadata.Item[1].Value;
      const amount = callbackMetadata.Item[0].Value;
      const phone = callbackMetadata.Item[3].Value;
      return res.status(200).json({ success: true});
    }
    return res.status(400).json({ error: "payment incomplete" });
  }
  return res.status(400).json({"error": "payment incomplete"});
}
