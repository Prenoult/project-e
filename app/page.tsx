"use client"

// packages
import { useState } from "react";

// shadcn-ui components
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Combobox } from "@/components/ui/combobox"
import { EV_VEHICLES } from "@/data/vehicles"

// helpers
import { parseNumber } from "@/lib/parser";
import {
  calculateEnergyConsumption,
  calculatePriceByCostAndConsumption,
  calculateBatteryUsage,
  EnergyConsumptionUnit
} from "@/lib/calculator";

export default function Home() {
  const [distance, setDistance] = useState("");
  const [averageConsumption, setAverageConsumption] = useState("");
  const [costPerKWh, setCostPerKWh] = useState("");
  const [batteryCapacity, setBatteryCapacity] = useState("");
  const [unit, setUnit] = useState<EnergyConsumptionUnit>('Wh/km');
  const [battery, setBattery] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(80);
  const [batteryTab, setBatteryTab] = useState<'vehicule' | 'capacity'>('capacity');
  const [selectedVehicle, setSelectedVehicle] = useState<string | undefined>(undefined);

  const distanceNum = parseNumber(distance);
  const avgConsNum = parseNumber(averageConsumption);
  const costNum = parseNumber(costPerKWh);

  const energyConsumption = calculateEnergyConsumption(
    isNaN(distanceNum) ? 0 : distanceNum,
    isNaN(avgConsNum) ? 0 : avgConsNum,
    unit
  );

  const totalPrice = calculatePriceByCostAndConsumption(
    energyConsumption,
    isNaN(costNum) ? 0 : costNum
  );

  const batteryInfo =
    battery
      && !isNaN(parseNumber(batteryCapacity))
      && parseNumber(batteryCapacity) > 0
      ? calculateBatteryUsage(
        parseNumber(batteryCapacity),
        batteryLevel,
        energyConsumption
      )
      : null;

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <div className="flex flex-col w-full max-w-sm gap-3">
        <Label>Distance (en km)</Label>
        <Input
          type="number"
          id="distance"
          inputMode="decimal"
          step="any"
          placeholder="30"
          value={distance}
          onChange={e => setDistance(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full max-w-sm gap-3">
        <Label>Consommation moyenne (en {unit === 'Wh/km' ? "Wh/km" : "kWh/100km"})</Label>
        <div className="flex gap-2">
          <Input
            type="number"
            id="averageConsumption"
            inputMode="decimal"
            step="any"
            placeholder={unit === 'Wh/km' ? "160" : "16"}
            value={averageConsumption}
            onChange={e => setAverageConsumption(e.target.value)}
          />
          <Select value={unit} onValueChange={setUnit}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Unité" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Wh/km">Wh/km</SelectItem>
              <SelectItem value="kWh/100km">kWh/100km</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-col w-full max-w-sm gap-3">
        <Label>Coût du kWh (en €)</Label>
        <Input
          type="number"
          id="costPerKWh"
          inputMode="decimal"
          step="any"
          placeholder="0,3"
          value={costPerKWh}
          onChange={e => setCostPerKWh(e.target.value)}
        />
      </div>
      <div className="flex flex-col w-full max-w-sm gap-3">
        <div className="flex items-center gap-3">
          <Switch id="battery" checked={battery} onCheckedChange={setBattery} />
          <Label htmlFor="battery">Estimer la batterie restante</Label>
        </div>
      </div>
      {battery &&
        <>
          <Tabs
            value={batteryTab}
            onValueChange={(v) => {
              const next = (v as 'vehicule' | 'capacity')
              setBatteryTab(next)
              if (next === 'capacity') {
                // Forget the selected vehicle when in capacity mode
                setSelectedVehicle(undefined)
              } else if (next === 'vehicule' && selectedVehicle) {
                // Reflect the model capacity if already selected
                const veh = EV_VEHICLES.find(ev => ev.value === selectedVehicle)
                if (veh) setBatteryCapacity(String(veh.capacityKWh))
              }
            }}
            className="w-full max-w-sm gap-3"
          >
            <TabsList>
              <TabsTrigger value="vehicule">Par véhicule</TabsTrigger>
              <TabsTrigger value="capacity">Par capacité</TabsTrigger>
            </TabsList>
            <TabsContent value="vehicule">
              <div className="flex flex-col w-full max-w-sm gap-3">
                <Label>Véhicule</Label>
                <Combobox
                  value={selectedVehicle}
                  onChange={(val) => {
                    setSelectedVehicle(val)
                    if (val) {
                      const veh = EV_VEHICLES.find(ev => ev.value === val)
                      if (veh) setBatteryCapacity(String(veh.capacityKWh))
                    }
                  }}
                />
              </div>
            </TabsContent>
            <TabsContent value="capacity">
              <div className="flex flex-col w-full max-w-sm gap-3">
                <Label>Capacité de la batterie du véhicule (en kWh)</Label>
                <Input
                  type="number"
                  id="batteryCapacity"
                  inputMode="decimal"
                  step="any"
                  placeholder="75"
                  value={batteryCapacity}
                  onChange={e => setBatteryCapacity(e.target.value)}
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex flex-col w-full max-w-sm gap-3">
            <Slider
              value={[batteryLevel]}
              onValueChange={(vals) => setBatteryLevel(vals[0] ?? 0)}
              max={100}
              step={1}
            />
            <Label>Niveau de batterie : {batteryLevel} %</Label>
          </div>
        </>
      }
      {
        !isNaN(distanceNum) && !isNaN(avgConsNum) && !isNaN(costNum) && (
          <div className="mt-4">
            <p className="text-lg font-medium">
              Consommation totale :{" "}
              <span className="font-bold">
                {energyConsumption.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + " kWh"}
              </span>
            </p>
            <p className="text-lg font-medium">
              Prix total : {" "}
              <span className="font-bold">
                {totalPrice.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + " €"}
              </span>
            </p>
            {battery && !isNaN(parseNumber(batteryCapacity)) && parseNumber(batteryCapacity) > 0 && (
              <p className="text-lg font-medium">
                Batterie restante après le trajet : {" "}
                <span className="font-bold">
                  {
                    batteryInfo?.remainingBatteryPercent.toLocaleString(
                      'fr-FR',
                      { maximumFractionDigits: 2 }
                    ) + " % ("
                    + batteryInfo?.remainingBatteryKWh.toLocaleString(
                      'fr-FR',
                      { maximumFractionDigits: 0 }) + " kWh) - "
                    + (
                      batteryInfo?.canCompleteTrip
                        ? "Le trajet peut être effectué."
                        : "Le trajet ne peut pas être effectué."
                    )
                  }
                </span>
              </p>
            )}
          </div>
        )
      }
    </div >
  );
}
