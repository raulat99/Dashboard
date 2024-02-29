import BarsChart from "@/app/components/BarsChart";
import LinesChart from "@/app/components/LinesChart";
import PiesChart from "@/app/components/PiesChart";
import Video from "@/app/components/Video";

export default async function Index() {
  return (
    <main className="flex flex-col">
      <div>
        <h1 className="text-4xl p-2 py-4 text-center"> Dashboard page </h1>
      </div>
      <div className="flex-col">
        <div className="display flex w-full flex-wrap">
          <Video />
          <Video />
            <Video />
            <Video />
        </div>
        <div className="z-10 w-full flex-col items-center font-mono text-md display flex " >
          <h2 className="text-lg m-2"> Components: </h2>
          <div className="w-full space-y-4 display flex flex-col">
            {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
                  <LinesChart />
                  <LinesChart />
            </div>
        </div>
      </div>
    </main>
  );
}
