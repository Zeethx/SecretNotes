import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/models/User";

dbConnect()

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: 'credential',
            name: 'Credentials',
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: "xyz@gmail.com" },
                password: { label: 'Password', type: 'password' }
            },

            async authorize(credentials: any): Promise<any> {
                try {
                    const user = await User.findOne({
                        $or: [
                            { email: credentials?.email },
                            { password: credentials?.password }
                        ]
                    })

                    if (!user) {
                        throw new Error('User not found with this email')
                    }

                    const isPasswordCorrect = await bcrypt.compare(credentials?.password, user.password)

                    if (!isPasswordCorrect) {
                        throw new Error('Invalid password')
                    } else {
                        return user
                    }

                } catch (error: any) {
                    throw new Error('Error in nextAuth', error)
                }
            }

        })
    ],
    callbacks : ({
        async jwt({token,user}) {
           if(user) {
               token._id = user._id?.toString()
               token.username = user.username
               token.isVerified = user.isVerified
               token.isAcceptingMessage = user.isAcceptingMessage
           }
           return token
        },
        async session({session,token}) {
            if(token) {
                session.user._id = token._id
                session.user.username = token.username
                session.user.isVerified = token.isVerified
                session.user.isAcceptingMessage = token.isAcceptingMessage
            }
            return session
        }
    }),
    pages : {
        signIn : '/signin'
    },
    secret : process.env.NEXT_SECRET,
    session : {
        strategy : 'jwt'
    }
} 