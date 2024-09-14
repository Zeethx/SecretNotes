import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { User } from "next-auth";
import mongoose, { mongo } from "mongoose";

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

    const userId = new mongoose.Types.ObjectId(user._id);
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

        const result = await UserModel.aggregate([
            { $match: { _id: userId } },
            { $unwind: "$messages" },
            { $sort: { "messages.createdAt": -1 } },
            {
                $group: {
                    _id: "$_id",
                    messages: { $push: "$messages" },
                },
            },
        ]);

        if (result.length === 0 || !result[0].messages || result[0].messages.length === 0) {
            return Response.json(
                {
                    success: true,
                    message: "No messages found for this user",
                    messages: [],
                },
                { status: 200 }
            );
        }

        return Response.json(
            {
                success: true,
                messages: result[0].messages,
            },
            { status: 200 }
        );

    } catch (error) {
        
    }
}