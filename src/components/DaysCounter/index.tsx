import React, { useEffect, useState } from "react";

interface DaysCounterProps {
  startDate: string;
  prefix?: string;
  suffix?: string;
}

const DaysCounter: React.FC<DaysCounterProps> = ({
  startDate,
  prefix = "",
  suffix = "",
}) => {
  const [days, setDays] = useState<number>(0);

  useEffect(() => {
    const start = new Date(startDate);
    const now = new Date();

    const timeDiff = now.getTime() - start.getTime();
    const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

    setDays(daysDiff);
  }, [startDate]);

  return (
    <span>
      {prefix}
      {days}
      {suffix}
    </span>
  );
};

export default DaysCounter;
