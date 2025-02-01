import nodemailer from 'nodemailer';


export const sendEmailService = async ({
    to = "",
    subject = "hello world",
    html = "<h1>test1</h1>",
    attachments = [],
}) => {
const transporter = nodemailer.createTransport({
    host: "localhost",
    port: 587,  //465 for secrure connection (enable tls)
    secure: false, 
    service:"gmail",
    auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
    },
});

try {
    const info = await transporter.sendMail({
    from: `hello <${process.env.EMAIL}>`,
    to,
    subject,
    html,
    attachments,
    });
    return info;
} catch (error) {
    console.error("Error sending email:", error);
}
};
