import contactModel from "../models/contactModel.js";

export const contactController = async (req, res) => {
  try {
    const { name, email, address, message } = req.fields;
    switch (true) {
      case !name:
        return res.status(500).send({ error: "Name is required" });
      case !email:
        return res.status(500).send({ error: "Email is required" });
      case !address:
        return res.status(500).send({ error: "Address is required" });
      case !message:
        return res.status(500).send({ error: "Message is required" });
    }
    //Check User
    const existingUser = await contactModel.findOne({ email });
    //existing User
    if (existingUser) {
      return res.status(200).send({
        success: false,
        message: "User with these Credentials already Sent Message",
      });
    }

    const contacts = new contactModel({ ...req.fields });
    await contacts.save();
    res.status(200).send({
      success: true,
      message: "Message Sent Successfully",
      contacts,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error in sending your message",
    });
  }
};
