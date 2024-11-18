import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log({body});
    

    // Mock 3rd-party API call
    const response = await fetch("https://x8ki-letl-twmt.n7.xano.io/api:YuSR7Mmi/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log({response});

    if (!response.ok) {
      throw new Error(`3rd-party API failed with status: ${response.status}`);
    }

    const data = await response.json();
    console.log({data});
    
    return NextResponse.json(data, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
