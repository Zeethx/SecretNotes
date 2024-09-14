import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import {z} from 'zod';
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

export async function GET(request: Request) {
    await dbConnect();

    try {
        const { searchParams } = new URL(request.url);
        const queryParam = {
            username: searchParams.get('username'),
        };

        const result = UsernameQuerySchema.safeParse(queryParam);

        if (!result.success) {
            const usernameError = result.error.format().username?._errors || [];
            return Response.json({
                success: false,
                message: usernameError?.length > 0 ? usernameError.join(', ') : "Invalid username",
            }, {status : 400});

        }

        const { username } = result.data;

        const existingUser = await UserModel.findOne({ username, isVerified: true });

        if (existingUser) {
            return Response.json({
                success: false,
                message: "Username already taken",
            }, {status: 400});
        }

        return Response.json({
            success: true,
            message: "Username is available",
        });


    } catch (error) {
        console.error("Error checkin unique username", error);
        return Response.json({
            success: false,
            message: "Error checking unique username",
        })
    }
}