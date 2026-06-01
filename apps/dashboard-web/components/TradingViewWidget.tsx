'use client';

import { useEffect, useRef } from 'react';

export default function TradingViewWidget() {
  const container =
    useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;

    container.current.innerHTML = '';

    const script =
      document.createElement('script');

    script.src =
      'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';

    script.type =
      'text/javascript';

    script.async = true;

    script.innerHTML = JSON.stringify({
      autosize: true,

      symbol: 'OANDA:XAUUSD',

      interval: '15',

      timezone: 'Asia/Jakarta',

      theme: 'dark',

      style: '1',

      locale: 'en',

      hide_top_toolbar: false,

      allow_symbol_change: false,

      save_image: false,

      studies: [
        'Volume@tv-basicstudies',
      ],
    });

    container.current.appendChild(
      script,
    );
  }, []);

  return (
    <div className="w-full h-[600px] rounded-3xl overflow-hidden">
      <div
        className="tradingview-widget-container h-full"
        ref={container}
      />
    </div>
  );
}