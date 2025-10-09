export function T({ children, className = "" }: any) {
  return <table className={`w-full ${className}`}>{children}</table>;
}
export function TH({ children, className = "" }: any) {
  return (
    <th className={`text-left font-medium text-gray-300 py-3 ${className}`}>
      {children}
    </th>
  );
}
export function TD({ children, className = "" }: any) {
  return (
    <td className={`py-4 text-sm text-gray-200 ${className}`}>{children}</td>
  );
}
export function TR({ children, className = "" }: any) {
  return (
    <tr className={`border-t border-border hover:bg-white/5 ${className}`}>
      {children}
    </tr>
  );
}
export function THEAD({ children }: any) {
  return <thead className="bg-white/5">{children}</thead>;
}
export function TBODY({ children }: any) {
  return <tbody>{children}</tbody>;
}
