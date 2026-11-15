'use client';

import React, { useState } from 'react';
import { Copy, Check, ExternalLink, Share2 } from 'lucide-react';
import Link from 'next/link';

interface CopyLinkButtonProps {
  token: string;
  variant?: 'button' | 'card';
}

export function CopyLinkButton({ token, variant = 'button' }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  const getFullUrl = () => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/confirm/${token}`;
    }
    return `/confirm/${token}`;
  };

  const getWhatsAppUrl = () => {
    const text = `Namaste! Here is your official KaamProof service agreement link. Please review work scope and confirm: ${getFullUrl()}`;
    return `https://wa.me/?text=${encodeURIComponent(text)}`;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getFullUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Clipboard copy failed:', err);
    }
  };

  if (variant === 'card') {
    return (
      <div className="bg-[#FFFFFF] border border-[#E4DFD7] rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-semibold uppercase tracking-wider text-[#52525B]">
            Unique Customer Confirmation Link
          </h4>
          <span className="text-[11px] font-mono bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded">
            Token: {token.slice(0, 10)}...
          </span>
        </div>
        <p className="text-xs text-[#52525B] mb-3">
          Share this private link with your customer via WhatsApp, SMS, or QR code so they can verify the agreement and approve completion without creating an account.
        </p>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <input
            type="text"
            readOnly
            value={typeof window !== 'undefined' ? getFullUrl() : `/confirm/${token}`}
            className="flex-1 text-xs font-mono bg-[#F4F2ED] border border-[#E4DFD7] rounded-lg px-3 py-2 text-[#18181B] select-all focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className={`inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg transition-colors min-h-[38px] ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#18181B] text-white hover:bg-zinc-800'
              }`}
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-lg bg-[#25D366] text-white hover:bg-[#20BD5A] transition-colors min-h-[38px]"
              title="Share via WhatsApp"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            <Link
              href={`/confirm/${token}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1 text-xs font-medium px-3 py-2 rounded-lg border border-[#E4DFD7] bg-white text-[#18181B] hover:bg-[#F4F2ED] transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#52525B]" />
              <span>Preview</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5">
      <button
        onClick={handleCopy}
        className={`inline-flex items-center gap-1 text-xs font-medium px-2.5 py-1.5 rounded-lg border transition-colors ${
          copied
            ? 'bg-emerald-50 border-emerald-300 text-emerald-800'
            : 'bg-white border-[#E4DFD7] text-[#18181B] hover:bg-[#F4F2ED]'
        }`}
        title="Copy customer confirmation link"
      >
        {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-[#52525B]" />}
        <span>{copied ? 'Copied' : 'Share Link'}</span>
      </button>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 text-emerald-600 hover:text-emerald-700 rounded-lg hover:bg-emerald-50 border border-transparent hover:border-emerald-200 transition-colors"
        title="Share agreement via WhatsApp"
      >
        <Share2 className="w-3.5 h-3.5" />
      </a>

      <Link
        href={`/confirm/${token}`}
        target="_blank"
        rel="noopener noreferrer"
        className="p-1.5 text-[#71717A] hover:text-[#18181B] rounded-lg hover:bg-[#F4F2ED]"
        title="Open customer portal in new tab"
      >
        <ExternalLink className="w-3.5 h-3.5" />
      </Link>
    </div>
  );
}
