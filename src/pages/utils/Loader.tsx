// components/GlobalLoader.tsx
import { Loader2 } from "lucide-react";
import { useLoadingStore } from "../../ZustandShare/LoadingZuts";

function GlobalLoader() {
  const { isLoading, text } = useLoadingStore();

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">

      <div 
     className="bg-white rounded-2xl px-6 py-5 shadow-lg flex flex-col items-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <p className="text-sm text-gray-600">{text}</p>
      </div>

    </div>
  );
}

export default GlobalLoader;