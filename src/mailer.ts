import { Resend } from "resend";
import { Effect } from "effect";
import { register } from "./worker";
import { EmailError } from "./errors";

const resend = new Resend(process.env.RESEND_API_KEY);

const from = process.env.EMAIL_FROM || "Acme <onboarding@resend.dev>";

type EmailPayload = {
  to: string;
  subject: string;
  html: string;
};

const sendEmail = (email: EmailPayload) =>
  Effect.tryPromise({
    try: () =>
      resend.emails.send({
        from,
        to: [email.to],
        subject: email.subject,
        html: email.html,
      }),
    catch: (cause) => new EmailError({ cause }),
  });

register("email", (payload) =>
  Effect.gen(function* () {
    const email = payload as EmailPayload;
    yield* sendEmail(email);
  }),
);
