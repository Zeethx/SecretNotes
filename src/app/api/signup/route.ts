import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import bcrypt from "bcryptjs";
import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";

export async function POST(req: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await req.json();
        const existingUser = await UserModel.findOne({
            username,
            verified: true,
        });

        if (existingUser) {
            return Response.json(
                {
                    success: false,
                    message: "Username already exists",
                },
                { status: 400 }
            );
        }

        const existingUserWithEmail = await UserModel.findOne({ email });
        const verificationCode = Math.floor(
            100000 + Math.random() * 900000
        ).toString();

        if (existingUserWithEmail) {
            if (existingUserWithEmail.verified) {
                return Response.json(
                    {
                        success: false,
                        message: "User with this email already exists",
                    },
                    { status: 400 }
                );
            } else {
                const hashedPassword = await bcrypt.hash(password, 10);
                existingUserWithEmail.password = hashedPassword;
                existingUserWithEmail.verificationCode = verificationCode;
                existingUserWithEmail.verificationCodeExpiry = new Date(
                    Date.now() + 15 * 60000
                );
                await existingUserWithEmail.save();
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const expiryDate = new Date();
            expiryDate.setMinutes(expiryDate.getMinutes() + 15);

            await new UserModel({
                username,
                email,
                password: hashedPassword,
                verificationCode: verificationCode,
                verificationCodeExpiry: expiryDate,
            }).save();
        }

        // Send verification email
        const emailResponse = await sendVerificationEmail(
            email,
            username,
            verificationCode
        );

        if (emailResponse.success) {
            return Response.json({
                success: true,
                message: "Verification email sent",
            });
        } else {
            return Response.json(
                {
                    success: false,
                    message: "Error sending verification email",
                },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error("Error signing up: ", error);
        return Response.json(
            {
                success: false,
                message: "Error signing up",
            },
            { status: 500 }
        );
    }
}
