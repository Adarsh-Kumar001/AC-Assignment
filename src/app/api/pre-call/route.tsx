import { NextResponse } from 'next/server';


export async function POST() {
    const samplePatients = [
        { id: 'MED-1001', name: 'Asha Verma', age: 34, allergies: ['Penicillin'], lastVisit: '2025-09-01', notes: 'Hypertension' },
        { id: 'MED-1002', name: 'Rohit Sharma', age: 45, allergies: [], lastVisit: '2025-07-10', notes: 'Post-op check' }
    ];


    return NextResponse.json({
        status: 'ok',
        domain: 'medical',
        pre_call_records: samplePatients,
        message: 'Pre-call payload: patient records for the caller'
    });
}