// /app/api/precall/route.ts
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // You can access the request body if needed
    const body = await req.json().catch(() => ({}));
    console.log("Pre-call request body:", body);

    // Sample patient list (can be dynamic later)
    const samplePatients = [
      { id: 'MED-1001', name: 'Adarsh', age: 34, allergies: ['Some flower'], lastVisit: '2025-09-01', notes: '' },
      { id: 'MED-1002', name: 'Kumar', age: 45, allergies: [], lastVisit: '2025-07-10', notes: 'Post-op check' }
    ];

    // Return dynamic_variables as per OpenMic docs
    return NextResponse.json({
      call: {
        dynamic_variables: {
          pre_call_records: samplePatients
        }
      }
    });
  } catch (err: any) {
    console.error("Pre-call endpoint error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
