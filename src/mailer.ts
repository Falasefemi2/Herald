import { Resend } from "resend";
import { register } from "./worker";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

register("email", async (payload) => {
  const email = payload as EmailPayload;
  await resend.emails.send({
    from,
    to: [email.to],
    subject: email.subject,
    html: email.html,
  });
});
