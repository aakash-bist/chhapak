import React, { useCallback, useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
function App() {
  const maxLoopLimit = 25;
  const [limit, setLimit] = useState<number>(1);
  const [output, setOutput] = useState<string[]>([]);

  const plugin = React.useRef(
    Autoplay({ delay: 1200, stopOnInteraction: true })
  );
  const handleLimitInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (
      value === "" ||
      (!isNaN(Number(value)) &&
        Number(value) >= 1 &&
        Number(value) <= maxLoopLimit)
    ) {
      setLimit(Number(value));
    }
  };
  const generateChhapak = useCallback(() => {
    let counter = 1;
    let data = ["MACHHLI 🐟", "PANI MEIN GAYI 🌊", "CHHAPAK 👏🏼"];
    let output = [];
    while (counter <= limit) {
      const loopLength = Array.from({
        length: counter,
      });
      for (let i = 0; i < data.length; i++) {
        for (let _ of loopLength) {
          const str = `${i === 0 ? counter : ""} ${data[i]}`.trim();
          output.push(str);
        }
      }
      counter++;
    }
    setOutput(output);
  }, [limit, setOutput]);
  useEffect(() => {
    generateChhapak();
  }, [limit, setOutput]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-300">
      <div className="w-full md:w-3/4 lg:w-1/2 px-4">
        <div className="card p-8 shadow-xl rounded-md ring-2 ring-slate-300 ring-offset-2">
          <h3 className="text-2xl font-semibold mb-4">KITNI MACHHLI?</h3>
          <div className="flex flex-col md:flex-row items-center">
            <input
              type="text"
              min="1"
              max={maxLoopLimit}
              name="limit"
              id="limit"
              value={limit}
              onChange={handleLimitInputChange}
              className="w-full  rounded-md border-2 py-1.5 px-3 md:mr-2 focus:outline-none focus:border-blue-300"
              placeholder="Pani mein gayi"
            />
            <Button
              variant="outline"
              className="w-full md:w-auto mt-2 md:mt-0 md:ml-2 px-4 py-2 font-bold bg-blue-300 hover:bg-blue-300 active:bg-blue-400"
              onClick={generateChhapak}
            >
              CHHAPAK
            </Button>
          </div>
          {output?.length > 0 && (
            <div className="mt-7">
              <Carousel plugins={[plugin.current]} className="mx-auto">
                <CarouselContent>
                  {output.map((item: string, idx: number) => (
                    <CarouselItem key={idx}>
                      <div className="p-1 flex items-center justify-center">
                        <Card className="">
                          <CardContent className="p-6">
                            <span className="text-4xl aspect-square font-semibold">
                              {item}
                            </span>
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
          )}
        </div>
      </div>
      <div className="overflow p-5 fixed bottom-0">
        Fun project by Aakash Bist
      </div>
    </div>
  );
}

export default App;
