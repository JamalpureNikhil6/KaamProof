import { NextRequest, NextResponse } from 'next/server';
import { updateJobStatus, calculateFinancials } from '@/lib/server/jobs-service';
import { JobStatus } from '@/lib/types';

export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { status, note, actorName } = body;
    if (!status) {
      return NextResponse.json(
        { success: false, error: 'Target status is required' },
        { status: 400 }
      );
    }
    const updatedJob = updateJobStatus(
      params.id,
      status as JobStatus,
      note,
      'worker',
      actorName || 'Technician'
    );
    return NextResponse.json({
      success: true,
      job: {
        ...updatedJob,
        financials: calculateFinancials(updatedJob),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to update status';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
