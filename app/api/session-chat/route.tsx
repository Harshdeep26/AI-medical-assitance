import { db } from "@/config/db";
import { SessionChatTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
    const { notes, selectedDoctor } = await req.json();
    const user = await currentUser();
    try {
        const sessionId = uuidv4(); // Generate a unique session ID
        const result = await db.insert(SessionChatTable).values({
            SessionId: sessionId,
            createdby: user?.primaryEmailAddress?.emailAddress,
            notes: notes,
            selectedDoctor: selectedDoctor,
            createdon: new Date().toISOString(),
            //@ts-ignore
        }).returning({ SessionChatTable });
        return NextResponse.json(result[0]?.SessionChatTable);
    }
    catch (e) {
        NextResponse.json(e)
    }
}

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("sessionId");
    const user = await currentUser();

    //@ts-ignore
    const result = await db.select().from(SessionChatTable).where(eq(SessionChatTable.SessionId, sessionId));
    return NextResponse.json(result[0]);
}