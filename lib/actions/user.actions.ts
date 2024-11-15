'use server';

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: POST_COLLECTION_ID,
} = process.env;

export const getUserInfo = async ({ userId }: {userId: string}) => {
    try {
      const { database } = await createAdminClient();
  
      const user = await database.listDocuments(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        [Query.equal('userId', [userId])]
      )
  
      return parseStringify(user.documents[0]);
    } catch (error) {
      console.log(error)
    }
  }

  export const parseStringify = async (value: any) => JSON.parse(JSON.stringify(value));
  
  export const signIn = async ({ email, password }: {email: string, password: string}) => {
    try {
      const { account } = await createAdminClient();
      const session = await account.createEmailPasswordSession(email, password);
  
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
  
      const user = await getUserInfo({ userId: session.userId }) 
  
      return parseStringify(user);
    } catch (error) {
      console.error('Error', error);
    }
  }
  
  export const signUp = async ({ email, password }: {email: string, password: string}) => {
    
    let newUserAccount;
    const username = email.split('@')[0]
  
    try {
      const { account, database } = await createAdminClient();
  
      newUserAccount = await account.create(
        ID.unique(), 
        email, 
        password, 
      );
  
      if(!newUserAccount) throw new Error('Error creating user')
  
      const newUser = await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        {
          email,
          username,
          referrals: 0,
          trustScore: 0,
          earnings: 0,
          userId: newUserAccount.$id
        }
      )
  
      const session = await account.createEmailPasswordSession(email, password);
  
      (await cookies()).set("appwrite-session", session.secret, {
        path: "/",
        httpOnly: true,
        sameSite: "strict",
        secure: false,
      });
  
      return parseStringify(newUser);
    } catch (error) {
      console.error('Error', error);
    }
  }
  
  export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      const result = await account.get();
  
      const user = await getUserInfo({ userId: result.$id})
  
      return parseStringify(user);
    } catch (error) {
      console.log(error)
      return null;
    }
  }
  
  export const logoutAccount = async () => {
    try {
      const { account } = await createSessionClient();
  
      (await cookies()).delete('appwrite-session');
  
      await account.deleteSession('current');
    } catch (error) {
      return null;
    }
  }