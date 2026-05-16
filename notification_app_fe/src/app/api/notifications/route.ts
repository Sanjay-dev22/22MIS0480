import axios from "axios";
import { NextResponse } from "next/server";

const TOKEN = process.env.ACCESS_TOKEN;

export async function GET() {
  try {
    const response = await axios.get(
      "http://4.224.186.213/evaluation-service/notifications",
      {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      }
    );

    return NextResponse.json(
      response.data.notifications
    );
  } catch (error: any) {
    console.log(
      error.response?.data || error.message
    );

    return NextResponse.json(
      {
        error: "Failed to fetch notifications",
      },
      {
        status: 500,
      }
    );
  }
}