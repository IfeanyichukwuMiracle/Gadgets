const https = require("https");
const AppError = require("../utils/appError");
const axios = require("axios");

const initializePayment = async (req, res, next) => {
  try {
    // console.log(req.body.order);
    const params = JSON.stringify({
      email: req.user.email,
      amount: req.body.amount,
      callback_url: `http://localhost:5174/cart`,
      metadata: {
        cancel_action: `http://localhost:5174/`,
      },
    });

    const options = {
      hostname: "api.paystack.co",
      port: 443,
      path: "/transaction/initialize",
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    };

    const reqToPaystack = https
      .request(options, (resFromPaystack) => {
        let data = "";

        resFromPaystack.on("data", (chunk) => {
          data += chunk;
        });

        resFromPaystack.on("end", () => {
          data = JSON.parse(data);
          return res.status(200).json({ status: "success", data });
        });
      })
      .on("error", (error) => {
        console.log(error);
        return next(
          AppError(
            "Failed to initialize payment. Check your connection an try again!",
            "fail",
            400
          )
        );
      });

    reqToPaystack.write(params);
    reqToPaystack.end();
  } catch (error) {
    console.log(error);
    return next(
      AppError(
        "Failed to process payment. Check your connection an try again!",
        "fail",
        500
      )
    );
  }
};

const verifyPayment = async (req, res, next) => {
  try {
    const response = await axios.get(
      `https://api.paystack.co:443/transaction/verify/${req.params.ref}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        },
      }
    );
    // console.log(response.data);
    return res.status(200).json({ status: "success", data: response.data });
  } catch (err) {
    console.log(err);
    return next(AppError(`Transaction verification failed!`));
  }
};

module.exports = { initializePayment, verifyPayment };
