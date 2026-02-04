import { NextResponse } from "next/server";
import { getDatabase } from "../../lib/mondodb"; // Import from your file

export async function GET() {
  try {
   
    const { db } = await getDatabase();

    const songs = await db
      .collection("songs")
      .find({  })
      .toArray();

    const formattedSongs = songs.map((song) => ({
      ...song,
      _id: song._id.toString(),
    }));

    return NextResponse.json(formattedSongs, { status: 200 });
    
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Failed to fetch songs" }, { status: 500 });
  }
}