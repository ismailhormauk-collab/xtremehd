export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="flex items-center gap-3">
        <div className="w-5 h-5 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]" />
        <div className="w-5 h-5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
        <div className="w-5 h-5 rounded-full bg-blue-400 animate-bounce" />
      </div>
    </div>
  );
}
