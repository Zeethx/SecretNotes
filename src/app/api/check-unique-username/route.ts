import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { z } from 'zod';
import { usernameValidation } from "@/schemas/signUpSchema";

const UsernameQuerySchema = z.object({
    username: usernameValidation,
});

// Explicitly mark this route as dynamic
export const dynamic = "force-dynamic";  

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
            return new Response(
                JSON.stringify({
                    success: false,
                    message: usernameError?.length > 0 ? usernameError.join(', ') : "Invalid username",
                }), { status: 400 }
            );
        }

        const { username } = result.data;

        const existingUser = await UserModel.findOne({ username, isVerified: true });

        if (existingUser) {
            return new Response(
                JSON.stringify({
                    success: false,
                    message: "Username already taken",
                }), { status: 400 }
            );
        }

        return new Response(
            JSON.stringify({
                success: true,
                message: "Username is available",
            })
        );

    } catch (error) {
        console.error("Error checking unique username", error);
        return new Response(
            JSON.stringify({
                success: false,
                message: "Error checking unique username",
            }), { status: 500 }
        );
    }
}
