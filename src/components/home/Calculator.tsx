'use client';
import { useState } from 'react';
import { faNum } from '@/lib/format';
import { monthlyPayment } from '@/lib/calculator';
import { Icon } from '@/components/shared/Icon';
import { ConsultButton } from '@/components/shared/Actions';
export function Calculator() {
  const [loan, setLoan] = useState(3000),
    [rate, setRate] = useState(23),
    [years, setYears] = useState(10);
  return (
    <div className="reveal card-luxe rounded-[26px] p-7 sm:p-8">
      <h3 className="font-black text-xl flex items-center gap-2">
        <Icon name="calculator" className="w-6 h-6 text-gold" /> محاسبه‌گر اقساط خرید
      </h3>
      <p className="text-xs text-muted mt-1 mb-6">
        مبلغ وام، سود و مدت را تنظیم کنید تا قسط ماهانه را ببینید
      </p>
      <label className="block mb-4">
        <span className="flex justify-between text-sm mb-2">
          <span>مبلغ وام</span>
          <span id="loanVal" className="text-champagne font-bold">
            {faNum(loan / 1000)} میلیارد تومان
          </span>
        </span>
        <input
          id="calcLoan"
          aria-label="مبلغ وام به میلیون تومان"
          type="range"
          min="500"
          max="10000"
          step="100"
          value={loan}
          onChange={(e) => setLoan(+e.target.value)}
          className="w-full"
        />
      </label>
      <label className="block mb-4">
        <span className="flex justify-between text-sm mb-2">
          <span>نرخ سود سالانه</span>
          <span id="rateVal" className="text-champagne font-bold">
            {faNum(rate)}٪
          </span>
        </span>
        <input
          id="calcRate"
          aria-label="نرخ سود سالانه"
          type="range"
          min="5"
          max="30"
          step="1"
          value={rate}
          onChange={(e) => setRate(+e.target.value)}
          className="w-full"
        />
      </label>
      <label className="block mb-5">
        <span className="flex justify-between text-sm mb-2">
          <span>مدت بازپرداخت</span>
          <span id="yearVal" className="text-champagne font-bold">
            {faNum(years)} سال
          </span>
        </span>
        <input
          id="calcYears"
          aria-label="مدت بازپرداخت به سال"
          type="range"
          min="1"
          max="20"
          step="1"
          value={years}
          onChange={(e) => setYears(+e.target.value)}
          className="w-full"
        />
      </label>
      <div className="calculator-summary rounded-2xl bg-deep border border-line p-5 flex items-center justify-between">
        <div>
          <div className="text-xs text-muted">قسط ماهانه شما</div>
          <output id="calcResult" className="block text-2xl font-black gold-text mt-1">
            {faNum(Math.round(monthlyPayment(loan, rate, years)))} تومان
          </output>
        </div>
        <ConsultButton
          kind="loan"
          className="ghost-btn px-4 py-3 rounded-xl text-sm whitespace-nowrap"
        >
          مشاوره وام
        </ConsultButton>
      </div>
    </div>
  );
}
