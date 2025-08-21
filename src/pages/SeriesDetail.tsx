import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { HeroBanner } from "../components/HeroBanner";
import { Carousel } from "../components/Carousel";
import { getSimilarSeries } from "../services";

export const SeriesDetail = () => {
  const { id } = useParams();
  const seriesId = parseInt(id as string, 10);

  const [relatedSeries, setRelatedSeries] = useState<any[]>([]);

  useEffect(() => {
    const fetchSeries = async () => {
      if (!seriesId) return;

      const series = await getSimilarSeries(seriesId);
      setRelatedSeries(series);
      window.scrollTo(0, 0);
    };
    fetchSeries();
  }, [seriesId]);

  return (
    <div className="bg-black min-h-screen text-white">
      <HeroBanner mediaType="tv" id={seriesId} />

      <section className="p-4">
        <Carousel title="You may also like" items={relatedSeries} />
      </section>
    </div>
  );
};
