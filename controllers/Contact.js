import { mailsender } from "../utils/mailSender.js";
import { contactUsEmail } from "../templates/contactFormRes.js";
import { Contact } from "../models/Contact.js";
import { respond } from "../utils/response.js";

export const contactUs = async (req, res) => {
  const { email, message } = req.body;

  try {
    const emailRes = await mailsender(
      email,
      "Your query is successfully send !",
      contactUsEmail(email, message)
    );

    // console.log(emailRes);

    const existing = await Contact.findOne({email:email})

    // const existingEmail = Contact.findOne(email);

    // console.log("data to be print.....",existingEmail)

    if(existing) {
      await Contact.findOneAndUpdate({email:email},{
        $push: {
          message:message,
        },
      },{new:true})

      return respond(res,"query is added into message of array",200,true,)
    }

    // if (existingEmail) {
    //   const updatedContact = await Contact.findOneAndUpdate(
    //     {
    //       email: email,
    //     },
    //     {
    //       $push: {
    //         message: message,
    //       },
    //     },
    //     { new: true }
    //   );

    //   return respond(res,"query is added into message of array",200,true,updatedContact)
    // }

    const contactus = await Contact.create({
      email,
      message,
    });

    return respond(res, "query send successfully", 200, true, contactus);
  } catch (error) {
    console.log(error);

    return respond(res, "Error in ContactUS controller.", 500, false);
  }
};
