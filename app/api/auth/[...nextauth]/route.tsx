import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDb } from '@utils/database';

interface UserSession {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  id?: string; // Add the 'id' property here
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      // const sessionUser = await User.findOne({ email: session?.user?.email });
      // session.user.id! = sessionUser._id.toString();
      if (session && session.user && session.user.email) {
        const sessionUser = await User.findOne({ email: session.user.email });
    
        if (sessionUser) {
          (session.user as UserSession).id = sessionUser._id.toString();
        }
      }

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDb();

        // check if user already exists
        if (profile && profile.email) {
          const userExists = await User.findOne({ email: profile.email });
        
          if (!userExists) {
            await User.create({
              email: profile.email,
              username: profile.name?.replace(/\s/g, "").toLowerCase(),
              image: profile.image,
            });
          }
        }
        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error);
        return false
      }
    },
  }
})

export { handler as GET, handler as POST }



// -------------------------------------
// "use client";
// import { Session } from "next-auth";
// import { SessionProvider } from "next-auth/react"
// import NextAuth from "next-auth/next";
// import GoogleProvider from "next-auth/providers/google";
// import User from "@models/user";


// import { connectToDb } from "@utils/database";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_ID! as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET! as string,
//     }),
//   ],
//   callbacks: {
//     async session({ session }: { session?: Session }) {
//       const sessionUser = await User.findOne({
//         email: session.user.email,
//       });

//       session.user.id = sessionUser._id.toString();

//       return session;
//     },
//     async signIn({ profile }) {
//       try {
//         await connectToDb();
//         //check if user already exists
//         const userExists = await User.findOne({
//           email: profile.email,
//         });
//         //if not create new user and save
//         if (!userExists) {
//           await User.create({
//             email: profile.email,
//             username: profile.name.replace(/\s/g, "").toLowerCase(),
//             image: profile.picture,
//           });
//         }
//         return true;
//       } catch (error) {
//         return false;
//       }
//     },
//   },
// });

// export { handler as GET, handler as POST };
