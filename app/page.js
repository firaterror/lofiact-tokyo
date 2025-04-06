import Image from "next/image";
import AirlineTracker from "@/components/airlineTracker";

export default function Home() {
  return (
    <div className="max-w-[800px] mx-auto text-left justify-left color-heading">
      <h1 className="mb-6">
        lofi air traffic control 🇯🇵 Japan edition
      </h1>
      <p className="c">
        Listen to air traffic control radio from Tokyo International Airport (RJTT) mixed with Lo-fi.
      </p>
      <AirlineTracker />
    </div>
  );
}
