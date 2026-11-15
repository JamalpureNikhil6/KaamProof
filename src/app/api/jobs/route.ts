import { NextRequest, NextResponse } from 'next/server';
import { getAllJobs, createJob, calculateFinancials } from '@/lib/server/jobs-service';
import { CreateJobInput } from '@/lib/types';

export async function GET() {
  try {
    const jobs = getAllJobs();
    const enriched = jobs.map((job) => ({
      ...job,
      financials: calculateFinancials(job),
    }));
    return NextResponse.json({ success: true, jobs: enriched });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as CreateJobInput;
    const newJob = createJob(body);
    return NextResponse.json({
      success: true,
      job: {
        ...newJob,
        financials: calculateFinancials(newJob),
      },
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Failed to create job';
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
