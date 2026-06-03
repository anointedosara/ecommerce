"use client";

import { useEffect, useState } from "react";

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

type CountdownProps = {
  /** How many days from "now" the timer should end. */
  days?: number;
  hours?: number;
  variant?: "inline" | "circles";
};

function diff(deadline: number): TimeLeft {
  const total = Math.max(0, deadline - Date.now());
  return {
    days: Math.floor(total / (1000 * 60 * 60 * 24)),
    hours: Math.floor((total / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((total / (1000 * 60)) % 60),
    seconds: Math.floor((total / 1000) % 60),
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

export default function Countdown({
  days = 3,
  hours = 23,
  variant = "inline",
}: CountdownProps) {
  // Initial values render identically on the server and the first client paint
  // to avoid a hydration mismatch; the live deadline is set after mount.
  const initial: TimeLeft = { days, hours, minutes: 19, seconds: 56 };
  const [time, setTime] = useState<TimeLeft>(initial);

  useEffect(() => {
    const deadline =
      Date.now() +
      ((days * 24 + hours) * 60 * 60 + 19 * 60 + 56) * 1000;
    const tick = () => setTime(diff(deadline));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [days, hours]);

  const units: { label: string; value: number }[] = [
    { label: "Days", value: time.days },
    { label: "Hours", value: time.hours },
    { label: "Minutes", value: time.minutes },
    { label: "Seconds", value: time.seconds },
  ];

  if (variant === "circles") {
    return (
      <div className="flex items-center gap-4 sm:gap-6">
        {units.map((u) => (
          <div
            key={u.label}
            className="flex h-14 w-14 flex-col items-center justify-center rounded-full bg-white text-black sm:h-16 sm:w-16"
          >
            <span className="text-base font-semibold leading-none">
              {pad(u.value)}
            </span>
            <span className="mt-0.5 text-[11px] leading-none">{u.label}</span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 sm:gap-4">
      {units.map((u, i) => (
        <div key={u.label} className="flex items-center gap-3 sm:gap-4">
          <div className="flex flex-col">
            <span className="text-xs font-medium">{u.label}</span>
            <span className="text-2xl font-bold tracking-wider sm:text-[32px] sm:leading-tight">
              {pad(u.value)}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="-mt-1 text-2xl font-bold text-primary sm:text-3xl">
              :
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
