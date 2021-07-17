import braintree from "braintree";

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "useYourMerchantId",
  publicKey: "useYourPublicKey",
  privateKey: "useYourPrivateKey",
});

export function getToken(req, res) {
  gateway.clientToken
    .generate({
      customerId: aCustomerId,
    })
    .then((response) => {
      // pass clientToken to your front-end
      const clientToken = response.clientToken;
    })
    .catch((err) => res.status(500).json(err));
}

export function processPayment(req, res) {
  let nonceFromTheClient = req.body.paymentMethodNonce;

  let amountFromTheClient = req.body.amount;

  gateway.transaction
    .sale({
      amount: "10.00",
      paymentMethodNonce: nonceFromTheClient,
      //   deviceData: deviceDataFromTheClient,
      options: {
        submitForSettlement: true,
      },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((err) => res.status(500).json(err));
}
