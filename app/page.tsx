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

// helpers
import { parseNumber } from "@/lib/parser";
import {
  calculateEnergyConsumption,
  calculatePriceByCostAndConsumption,
  EnergyConsumptionUnit
} from "@/lib/calculator";

export default function Home() {
  const [distance, setDistance] = useState("");
  const [averageConsumption, setAverageConsumption] = useState("");
  const [costPerKWh, setCostPerKWh] = useState("");
  const [unit, setUnit] = useState<EnergyConsumptionUnit>('Wh/km');

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

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 p-4">
      <div className="grid w-full max-w-sm items-center gap-3">
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
      <div className="grid w-full max-w-sm items-center gap-3">
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
      {!isNaN(distanceNum) && !isNaN(avgConsNum) && !isNaN(costNum) && (
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
        </div>
      )}
    </div>
  );
}