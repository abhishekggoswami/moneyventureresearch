"use client"

import { useEffect, useRef, memo } from "react"

function TopBarComponent() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    const widgetDiv = document.createElement("div")
    widgetDiv.className = "tradingview-widget-container__widget"
    containerRef.current.appendChild(widgetDiv)

    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-tickers.js"
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = JSON.stringify({
      symbols: [
        { proName: "FOREXCOM:SPXUSD", title: "S&P 500" },
        { proName: "FOREXCOM:NSXUSD", title: "US 100" },
        { proName: "FOREXCOM:DJI",    title: "Dow Jones" },
        { proName: "FX:EURUSD",       title: "EUR/USD" },
        { proName: "BITSTAMP:BTCUSD", title: "Bitcoin" },
        { proName: "BITSTAMP:ETHUSD", title: "Ethereum" },
        { proName: "CMCMARKETS:GOLD", title: "Gold" },
      ],
      colorTheme: "dark",
      locale: "en",
      largeChartUrl: "",
      isTransparent: true,
      showSymbolLogo: true,
    })

    containerRef.current.appendChild(script)

    return () => {
      if (containerRef.current) {
        containerRef.current.innerHTML = ""
      }
    }
  }, [])

  return (
    <div
      className="overflow-hidden relative"
      style={{
        height: "56px",
        background: "linear-gradient(90deg, #000000 0%, #0a1f14 15%, #1B4332 40%, #0f2a1d 60%, #0a1f14 82%, #000000 100%)",
      }}
    >
      {/* Global styles: green background, clip widget height, hide copyright */}
      <style jsx global>{`
        .tv-topbar-widget {
          background: transparent !important;
        }
        .tv-topbar-widget .tradingview-widget-container,
        .tv-topbar-widget .tradingview-widget-container__widget {
          background: transparent !important;
        }
        .tv-topbar-widget {
          max-height: 56px;
          overflow: hidden;
        }
        .tv-topbar-widget .tradingview-widget-copyright,
        .tv-topbar-widget [class*="copyright"],
        .tv-topbar-widget [class*="Copyright"],
        .tv-topbar-widget [class*="attribution"],
        .tv-topbar-widget a[href*="tradingview"] {
          display: none !important;
          visibility: hidden !important;
          height: 0 !important;
          max-height: 0 !important;
          overflow: hidden !important;
        }
      `}</style>

      {/* The widget renders here */}
      <div
        className="tv-topbar-widget tradingview-widget-container w-full"
        ref={containerRef}
      />
    </div>
  )
}

export const TopBar = memo(TopBarComponent)
