import Image from "next/image";
import AirlineTracker from "@/components/airlineTracker";
import FlightRadarMap from "@/components/flightRadarMap";
import YoutubeEmbed from "@/components/youtubeEmbed";
import LiveATC from "@/components/liveatc";

export default function Home() {
  return (
    <div className="max-w-[800px] mx-auto text-left justify-left color-heading">
      <h1 className="mb-6">
        lofi air traffic control 🇯🇵 Japan edition
      </h1>
      <p className="c">
      Listen to live air traffic control radio from Tokyo International Airport (RJTT) mixed with 90's Retro Tokyo Lo-fi from Japan.
      </p>
      <AirlineTracker />
      <FlightRadarMap />
      <YoutubeEmbed />
      <LiveATC/>
    </div>
  );
}
