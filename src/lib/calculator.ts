/** Loan slider is expressed in MILLIONS of tomans, matching the original labels. */
export function monthlyPayment(millions: number, annualRate: number, years: number) {
  const principal = millions * 1_000_000;
  const rate = annualRate / 100 / 12;
  const months = years * 12;
  if (months <= 0) return 0;
  return rate === 0 ? principal / months : (principal * rate) / (1 - Math.pow(1 + rate, -months));
}
