import { NextResponse } from "next/server";
import { db, isFirebaseAdminConfigured } from "@/lib/firebase-admin";

export async function POST(req: Request) {
  try {
    if (!isFirebaseAdminConfigured) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Firebase Admin is not configured. Add real credentials to .env.local.",
        },
        { status: 500 }
      );
    }

    const { name, email, message } = await req.json();

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    await db.collection("messages").add({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
