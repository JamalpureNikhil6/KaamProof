import { NextRequest, NextResponse } from 'next/server';
import {
  getJobByCustomerToken,
  customerRespondToAgreement,
  customerRespondToCompletion,
  calculateFinancials,
} from '@/lib/server/jobs-service';

export async function GET(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const job = getJobByCustomerToken(params.token);
    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired confirmation link' },
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

export async function POST(
  req: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    const body = await req.json();
    const { action, confirmed, approved, disputeReason, note, customerName } = body;

    if (action === 'confirm_agreement') {
      const updatedJob = customerRespondToAgreement(
        params.token,
        Boolean(confirmed),
        customerName,
        note
      );
      return NextResponse.json({
        success: true,
        job: {
          ...updatedJob,
          financials: calculateFinancials(updatedJob),
        },
      });
    }

    if (action === 'review_completion') {
      const updatedJob = customerRespondToCompletion(
        params.token,
        Boolean(approved),
        disputeReason,
        customerName,
        note
      );
      return NextResponse.json({
        success: true,
        job: {
          ...updatedJob,
          financials: calculateFinancials(updatedJob),
        },
      });
    }

    return NextResponse.json(
      { success: false, error: `Unsupported action '${action}'` },
      { status: 400 }
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Action failed';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
