'use client';
import Link from 'next/link';
import type { ReactNode } from 'react';
import { useResultsPath, type ResultSection } from '@/lib/results-history';
export function ResultsBackLink({
  section,
  className,
  children,
}: {
  section: ResultSection;
  className: string;
  children: ReactNode;
}) {
  const href = useResultsPath(section);
  return (
    <Link prefetch={false} href={href} className={className}>
      {children}
    </Link>
  );
}
