import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";

export async function POST(request: Request) {
    await dbConnect();

    const session = await getServerSession({ req: request, ...authOptions });
    const user: User = session?.user as User;

    if (!session || !user) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized",
            },
            { status: 401 }
        );
    }

    const userId = user._id;
    const { isAcceptingMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate(
            userId,
            { isAcceptingMessages: isAcceptingMessages },
            { new: true }
        );

        return Response.json(
            {
                success: true,
                message: "User settings updated successfully",
                user: updatedUser,
            },
            { status: 200 }
        );
    } catch {
        return Response.json(
            {
                success: false,
                message: "Failed to change user settings",
            },
            { status: 500 }
        );
    }
}

export async function GET(request: Request) {
    await dbConnect();

    const session = await getServerSession({ req: request, ...authOptions });
    const user: User = session?.user as User;

    if (!session || !user) {
        return Response.json(
            {
                success: false,
                message: "Unauthorized",
            },
            { status: 401 }
        );
    }

    const userId = user._id;

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return Response.json(
                {
                    success: false,
                    message: "User not found",
                },
                { status: 404 }
            );
        }

        return Response.json(
            {
                success: true,
                isAcceptingMessages: user.isAcceptingMessages,
            },
            { status: 200 }
        );
    } catch {
        return Response.json(
            {
                success: false,
                message: "Failed to fetch user settings",
            },
            { status: 500 }
        );
    }
}
