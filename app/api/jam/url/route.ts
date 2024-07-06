import { NextRequest, NextResponse } from "next/server";
import { kv } from "@vercel/kv";

export const runtime = "edge";

const LATEST_JAM_KEY = "latest_jam_link";

export async function POST(request: NextRequest) {
  try {
    // Parse the JSON body
    const body = await request.json();

    // Validate the input
    if (!body.jamLink || !body.jamLink.startsWith("https://spotify.link/")) {
      return NextResponse.json(
        { error: "Invalid Spotify Jam link" },
        { status: 400 },
      );
    }

    // Store the latest jam link in KV
    await kv.set(LATEST_JAM_KEY, body.jamLink);

    // Get the Vercel region, or 'development' if not deployed
    const region = process.env.VERCEL_REGION || "development";

    // Create the response
    const responseBody = {
      message: `Hello from ${region}`,
      storedJamLink: body.jamLink,
    };

    // Return the response
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    // Fetch the latest jam link
    const latestJamLink = await kv.get(LATEST_JAM_KEY);

    // Create the response
    const responseBody = {
      latestJamLink: latestJamLink || null,
    };

    // Return the response
    return NextResponse.json(responseBody, { status: 200 });
  } catch (error) {
    console.error("Error fetching latest jam link:", error);
    return NextResponse.json(
      { error: "Error fetching latest jam link" },
      { status: 500 },
    );
  }
}
