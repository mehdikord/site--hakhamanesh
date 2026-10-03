'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { AnchorHTMLAttributes } from 'react';
export function NavLink({
  href,
  className = '',
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  const path = usePathname();
  const active =
    href === '/'
      ? path === '/'
      : path.startsWith(href) || (href === '/properties' && path === '/search');
  return (
    <Link
      prefetch={false}
      href={href}
      {...props}
      className={`${className}${active ? ' active' : ''}`}
      aria-current={active ? 'page' : undefined}
    />
  );
}
