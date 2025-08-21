import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getWatchProviders } from "../services/tmdbApi";

interface Props {
  movieId: number;
  mediaType: "movie" | "tv";
  isOpen: boolean;
  onClose: () => void;
}

type Provider = {
  logo_path: string | null;
  provider_id: number;
  provider_name: string;
};

export const WatchProvidersModal = ({
  movieId,
  mediaType,
  isOpen,
  onClose,
}: Props) => {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [region, setRegion] = useState("US");
  const [tmdbLink, setTmdbLink] = useState<string>("");
  const [regionOpen, setRegionOpen] = useState(false);

  useEffect(() => {
    if (!isOpen || !movieId) return;
    setProviders([]);
    setTmdbLink("");

    getWatchProviders(movieId, mediaType).then((results: any) => {
      const regionData = results?.[region];
      if (!regionData) {
        setProviders([]);
        setTmdbLink("");
        return;
      }
      const { flatrate = [], buy = [], rent = [], link = "" } = regionData;
      const merged: Provider[] = [...flatrate, ...buy, ...rent];

      const unique = Array.from(
        new Map(merged.map((p: Provider) => [p.provider_id, p])).values()
      );

      setProviders(unique);
      setTmdbLink(link || "");
    });
  }, [movieId, mediaType, isOpen, region]);

  const regions = ["US", "CO", "MX", "ES"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-zinc-900 p-6 rounded-2xl shadow-xl w-[92%] max-w-lg relative"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
          >
            {/* Close */}
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-gray-400 hover:text-white"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h2 className="text-xl text-white font-bold mb-4">Available on</h2>

            {/* Providers in circles */}
            <div className="flex-1 flex items-center justify-center mb-0 min-h-[80px]">
              {providers.length > 0 ? (
                <div className="flex gap-4 flex-wrap justify-center">
                  {providers.map((p) => (
                    <a
                      key={p.provider_id}
                      href={tmdbLink || "#"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 rounded-full overflow-hidden shadow-lg border border-gray-600 hover:scale-105 transition"
                      title={p.provider_name}
                    >
                      {p.logo_path ? (
                        <img
                          src={`https://image.tmdb.org/t/p/original${p.logo_path}`}
                          alt={p.provider_name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-300 px-2 text-center">
                          {p.provider_name}
                        </div>
                      )}
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center">
                  Not available in this region.
                </p>
              )}
            </div>

            {/* Fallback: button to view on TMDB */}
            {tmdbLink && (
              <div className="mt-4 text-center">
                <a
                  href={tmdbLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs bg-white text-black font-semibold px-3 py-1 rounded hover:bg-zinc-200"
                >
                  View on TMDB
                </a>
              </div>
            )}

            {/* Region: dropdown */}
            <div className="mt-6">
              <button
                onClick={() => setRegionOpen((v) => !v)}
                className="flex items-center gap-2 text-zinc-400 hover:text-white"
                aria-expanded={regionOpen}
                aria-controls="region-panel"
              >
                <span className="text-sm">Región: {region}</span>
                <span
                  className={`transition ${regionOpen ? "rotate-180" : ""}`}
                >
                  ▾
                </span>
              </button>

              <AnimatePresence>
                {regionOpen && (
                  <motion.div
                    id="region-panel"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="grid grid-cols-4 gap-2">
                      {regions.map((r) => (
                        <button
                          key={r}
                          onClick={() => {
                            setRegion(r);
                            setRegionOpen(false);
                          }}
                          className={`text-xs px-2 py-1 rounded border ${
                            r === region
                              ? "bg-zinc-800 text-white border-zinc-700"
                              : "text-zinc-300 border-zinc-700 hover:bg-zinc-800 hover:text-white"
                          }`}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
