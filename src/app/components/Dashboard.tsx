"use client";
import LinesChart from "./LinesChart";
import ReactVideoPlayer from "./ReactVideoPlayer";
import ControlsVideo from "./ControlsVideo";

export default function Dashboard() {
  //const url = "//vjs.zencdn.net/v/oceans.mp4";
  //const url = "https://www.youtube.com/watch?v=OlL1bDImVkM";
  const url = "https://www.youtube.com/watch?v=2FOYmlLW1bw";
  const height = 350;
  const width = 700;
  const fps = 30;

  const videoConfig1 = { id: "1", url, height, width, fps };
  const videoConfig2 = { id: "2", url, height, width, fps };
  const videoConfig3 = { id: "3", url, height, width, fps };
  const videoConfig4 = { id: "4", url, height, width, fps };

  var configArray = [videoConfig1, videoConfig2, videoConfig3, videoConfig4];

  return (
    <main className="flex flex-col items-center">
      <h1 className="text-4xl p-2 py-4 text-center"> Dashboard page </h1>
        <div className="flex flex-wrap justify-center gap-4">
          {configArray.map((videoConfigItem) => {
            return (
              <ReactVideoPlayer {...videoConfigItem} key={videoConfigItem.id} />
            );
          })}
        </div>
        <div className="z-10 w-full flex-col items-center font-mono text-md display flex ">
          <ControlsVideo />
          <h2 className="text-lg m-2"> Components: </h2>
          <div className="w-full space-y-4 display flex flex-col">
            {/* Aquí incluiré las gráficas (un componente por cada ejemplo). */}
            <LinesChart />
            <LinesChart />
          </div>
        </div>
    </main>
  );
}
