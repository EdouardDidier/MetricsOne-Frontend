import { NextRequest, NextResponse } from "next/server";

import { Meeting } from "@/types/Meeting";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ year: string }> },
) {
  try {
    const year = (await params).year;
    const urlParams = request.nextUrl.searchParams;

    const apiHost = process.env.API_HOST;
    const apiPort = process.env.API_PORT;

    if (!apiHost || !apiPort) {
      return NextResponse.json(
        { error: "API configuration not found" },
        { status: 500 },
      );
    }

    // Building API URL from request parameters
    let apiUrl = apiHost + ":" + apiPort + "/" + year + "/meetings";

    if (urlParams.size > 0) {
      urlParams.entries().forEach(([key, value], index) => {
        apiUrl += index == 0 ? "?" : "&";
        apiUrl += key + "=" + value;
      });
    }

    console.log(apiUrl);
    const response = await fetch(apiUrl);

    const data: Meeting[] = await response.json();

    // Sort driver by last name
    data.sort((a: Meeting, b: Meeting) =>
      a.number > b.number ? 1 : b.number > a.number ? -1 : 0,
    );

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error("Faile to fetch meetings:", error);
    return NextResponse.json(
      { error: "Failed to fetch meetings" },
      { status: 500 },
    );
  }
}
