import { NextRequest, NextResponse } from 'next/server';
import { getJobById, calculateFinancials } from '@/lib/server/jobs-service';

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const job = getJobById(params.id);
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }
    const financials = calculateFinancials(job);
    return NextResponse.json({
      success: true,
      job: {
        ...job,
        financials,
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
