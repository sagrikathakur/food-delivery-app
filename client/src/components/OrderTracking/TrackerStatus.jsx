import React from 'react';

const TrackerStatus = ({
  status = 'In Transit via Insured Courier',
  estimatedTime = 'Expected Delivery: Friday, Sep 19',
}) => {
  const steps = [
    { id: 1, title: 'Bespoke Order Confirmed', desc: 'Sep 17, 10:15 AM' },
    { id: 2, title: 'Atelier Bottled & Sealed', desc: 'Sep 17, 02:30 PM' },
    { id: 3, title: 'Shipped via Air Courier', desc: 'In Transit' },
    { id: 4, title: 'Delivered', desc: 'Pending' },
  ];

  const currentStepIndex = 3;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 p-6 md:p-8 shadow-sm space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-stone-100">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-widest px-3 py-1 rounded bg-stone-100 text-stone-800 border border-stone-200">
            Order #OP-88291
          </span>
          <h2 className="text-2xl font-serif text-stone-900 mt-2 font-bold">
            Status: <span className="text-amber-900">{status}</span>
          </h2>
        </div>

        <div className="bg-stone-50 border border-stone-200/80 px-4 py-3 rounded-xl text-left md:text-right">
          <p className="text-[11px] uppercase tracking-wider text-stone-400 font-semibold">Estimated Delivery</p>
          <p className="text-sm font-serif font-bold text-stone-800">{estimatedTime}</p>
        </div>
      </div>

      {/* Progress Stepper */}
      <div className="relative py-2">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {steps.map((s) => {
            const isDone = s.id <= currentStepIndex;
            const isCurrent = s.id === currentStepIndex;

            return (
              <div
                key={s.id}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-stone-900 border-stone-900 text-white shadow-xs'
                    : isDone
                    ? 'bg-stone-50 border-stone-200 text-stone-900'
                    : 'bg-white border-stone-100 opacity-40 text-stone-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                    isCurrent ? 'bg-amber-400 text-stone-950' : 'bg-stone-200 text-stone-800'
                  }`}>
                    {s.id}
                  </div>
                  <div>
                    <h4 className="font-serif font-semibold text-xs">{s.title}</h4>
                    <p className="text-[11px] opacity-80 mt-0.5 font-light">{s.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TrackerStatus;
