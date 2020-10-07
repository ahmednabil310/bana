// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
const sgMail = require('@sendgrid/mail');

function contactUs(data) {
    //var currentTime = Math.round((new Date()).getTime() / 1000);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: "emailManishKapoor@gmail.com",
        from: 'Manish@Trukno.com',
        //send_at : currentTime + 120,
        templateId: process.env.SENDGRID_CONTACT_US_TEMPLATE_ID,
        dynamic_template_data: data
    }
    //sgMail.send(msg)
    sgMail
        .send(msg, (error, result) => {
            if (error) {
                //Do something with the error
                console.log("response is " + error)
            } else {
                //Celebrate
            }
        });
}

//email to activate account (data => email, link, firstName, lastName)
function activationEmail(data) {
    //var currentTime = Math.round((new Date()).getTime() / 1000);

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: data.email,
        from: process.env.SENDGRID_FROM_EMAIL,
        //send_at : currentTime + 120,
        templateId: process.env.SENDGRID_ACTIVATE_ACCOUNT_TEMPLATE_ID,
        dynamic_template_data: data
    }
    //sgMail.send(msg)
    sgMail
        .send(msg, (error, result) => {
            if (error) {
                //Do something with the error
                console.log("response is " + error)
            } else {
                //Celebrate
            }
        });
}

module.exports = {
    contactUs,
    activationEmail,
}