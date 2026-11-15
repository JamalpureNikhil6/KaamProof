import { NextRequest, NextResponse } from 'next/server';
import { recordPayment, calculateFinancials } from '@/lib/server/jobs-service';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { amount, type, method, note } = body;
    if (!amount || Number(amount) <= 0) {
      return NextResponse.json(
        { success: false, error: 'Valid payment amount is required' },
        { status: 400 }
      );
    }
    const updatedJob = recordPayment(params.id, {
      amount: Number(amount),
      type: type || 'partial',
      method: method || 'cash',
      note,
    });
    return NextResponse.json({
      success: true,
      job: {
        ...updatedJob,
        financials: calculateFinancials(updatedJob),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to record payment';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
