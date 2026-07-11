export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-emerald-50">
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-emerald-200 rounded-full animate-spin border-t-emerald-600" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-emerald-700">H</span>
            </div>
          </div>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">HireMe Maroc</p>
            <p className="text-sm text-gray-500 mt-1">Chargement en cours...</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-24 pb-12">
        <div className="mb-8">
          <div className="h-8 w-64 bg-gray-200 rounded-lg animate-pulse mb-4" />
          <div className="h-4 w-96 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-xl animate-pulse" />
                <div className="flex-1">
                  <div className="h-5 w-3/4 bg-gray-200 rounded animate-pulse mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="h-3 w-full bg-gray-200 rounded animate-pulse" />
                <div className="h-3 w-2/3 bg-gray-200 rounded animate-pulse" />
              </div>
              <div className="flex gap-2">
                <div className="h-6 w-20 bg-emerald-100 rounded-full animate-pulse" />
                <div className="h-6 w-24 bg-amber-100 rounded-full animate-pulse" />
                <div className="h-6 w-16 bg-gray-100 rounded-full animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
