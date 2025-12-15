import "dotenv/config";
import { createTransport } from "nodemailer";

const transport = createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});

export const MailerClient = {
    send: async (recipient: string, subject: string, message: string) => {
        try {
            await transport.sendMail({
                from: process.env.SMTP_USER,
                to: recipient,
                subject,
                text: message,
            });
            return true;
        } catch (err) {
            console.error("mailer failed\n", err);
            return false;
        }
    },
};
