import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(request: Request) {
    await dbConnect();

    try {
        const { username, verificationCode } = await request.json();

        const decodedUsername = decodeURIComponent(username);

        const user = await UserModel.findOne({username: decodedUsername});

        if(!user){
            return Response.json({
                success: false,
                message: "User not found"
            },
            {status: 500}
        )
        }

        const isVerificationCodeValid = user.verificationCode === verificationCode;
        const isVerificationCodeExpired = new Date(user.verificationCodeExpiry) > new Date();

        if(isVerificationCodeValid && isVerificationCodeExpired){
            user.verified = true;
            await user.save();
            console.log("User verified successfully", user);
            return Response.json({
                success: true,
                message: "User verified successfully"
            },
            {status: 200}
        )
        } else {
            return Response.json({
                success: false,
                message: "Invalid verification code"
            },
            {status: 500}
        )
        }

    } catch {
        return Response.json({
            success: false,
            message: "Something went wrong"
        },
        {status: 500}
    )
    }
}