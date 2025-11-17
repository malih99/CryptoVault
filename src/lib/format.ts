export type CurrencyCode = "USD" | "EUR" | "IRR" | string;

function getLocale(): string {
  if (typeof navigator !== "undefined" && navigator.language) {
    return navigator.language;
  }
  return "en-US";
}

export function formatNumber(
  value: number,
  opts: Intl.NumberFormatOptions = {}
): string {
  try {
    return new Intl.NumberFormat(getLocale(), opts).format(value);
  } catch {
    return String(value);
  }
}

export function formatCurrency(
  value: number,
  currency: CurrencyCode = "USD",
  opts: Intl.NumberFormatOptions = {}
): string {
  try {
    return new Intl.NumberFormat(getLocale(), {
      style: "currency",
      currency,
      maximumFractionDigits: 2,
      ...opts,
    }).format(value);
  } catch {
    const sign = value < 0 ? "-" : "";
    const abs = Math.abs(value);
    return `${sign}${currency} ${formatNumber(abs, {
      maximumFractionDigits: 2,
    })}`;
  }
}

export function formatPercent(
  value: number,
  opts: { maximumFractionDigits?: number } = {}
): string {
  const { maximumFractionDigits = 2 } = opts;
  return `${formatNumber(value, { maximumFractionDigits })}%`;
}

export function formatCompact(
  value: number,
  opts: Intl.NumberFormatOptions = {}
): string {
  return formatNumber(value, {
    notation: "compact",
    maximumFractionDigits: 1,
    ...opts,
  });
}

export function formatCrypto(
  value: number,
  opts: { minFrac?: number; maxFrac?: number } = {}
): string {
  const { minFrac = 2, maxFrac = 4 } = opts;
  return formatNumber(value, {
    minimumFractionDigits: minFrac,
    maximumFractionDigits: maxFrac,
  });
}
