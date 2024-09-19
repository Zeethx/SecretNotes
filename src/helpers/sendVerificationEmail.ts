import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";

export async function sendVerificationEmail(
    email: string,
    username: string,
    verificationCode: string
): Promise<ApiResponse> {
    try {
        const emailContent = VerificationEmail({username, otp:verificationCode});
        const sendMail = await resend.emails.send({
            from: 'onboarding@secretnotes.me',
            to: email,
            subject: 'SecretNotes | Verify your email',
            react: emailContent,
        });
        
        console.log("Email sent: ", sendMail);

        return {
            success: true,
            message: "Verification email sent",
        };

    } catch (emailError) {
        console.error("Error sending verification email: ", emailError);
        return {
            success: false,
            message: "Error sending verification email",
        };
    }
}