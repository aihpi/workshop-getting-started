export default function LogoHeader({ isConnected }) {
  return (
    <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3">
      <div className="flex items-center gap-6">
        <img
          src="/logo_aisc_150dpi.png"
          alt="AI Service Centre Berlin Brandenburg"
          className="h-8 w-auto object-contain sm:h-10"
        />
        <img
          src="/logo_bmftr_de.png"
          alt="Bundesministerium für Forschung, Technologie und Raumfahrt"
          className="h-8 w-auto object-contain sm:h-10"
        />
      </div>
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span
          className={`inline-block h-2.5 w-2.5 rounded-full ${
            isConnected ? 'bg-green-500' : 'bg-red-500'
          }`}
        />
        <span className="hidden sm:inline">
          {isConnected ? 'Connected' : 'Disconnected'}
        </span>
      </div>
    </header>
  )
}
