import { NextResponse } from "next/server";

// Export a named `POST` handler for logout
export async function POST() {
  try {
    // Clear the token cookie
    const response = NextResponse.json({ message: "Logged out successfully" });
    response.cookies.set("token", "", {
      path: "/",
      expires: new Date(0), // Expire immediately
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to log out", error },
      { status: 500 }
    );
  }
}
