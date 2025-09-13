export type EnergyConsumptionUnit = 'Wh/km' | 'kWh/100km';

/**
 * Calculates total energy consumption in kWh for a trip.
 *
 * Accepts average consumption either in `Wh/km` or in `kWh/100km` and converts
 * it to `kWh/km` before multiplying by the distance in kilometers.
 *
 * @param distanceKm Trip distance in kilometers.
 * @param avgConsumptionPerKm Average consumption value (unit defined by `unit`).
 * @param unit Unit of `avgConsumptionPerKm` ("Wh/km" or "kWh/100km").
 * @returns Total energy consumption in kWh.
 * @example
 * // 50 km at 160 Wh/km -> 8 kWh
 * calculateEnergyConsumption(50, 160, 'Wh/km')
 * // 50 km at 16 kWh/100km -> 8 kWh
 * calculateEnergyConsumption(50, 16, 'kWh/100km')
 */
export function calculateEnergyConsumption(
  distanceKm: number,
  avgConsumptionPerKm: number,
  unit: EnergyConsumptionUnit = 'Wh/km'
): number {
  const factor = unit === 'Wh/km' ? 1 / 1000 : 1 / 100;
  return distanceKm * avgConsumptionPerKm * factor;
}

/**
 * Calculates total price from energy consumption and unit cost.
 *
 * @param totalConsumptionKWh Total energy consumption in kWh.
 * @param costPerKWh Energy cost per kWh (in currency units, e.g., EUR).
 * @returns Total price for the energy consumed.
 */
export function calculatePriceByCostAndConsumption(
  totalConsumptionKWh: number,
  costPerKWh: number
): number {
  return totalConsumptionKWh * costPerKWh;
}

/**
 * Estimates battery usage for a trip.
 *
 * Given the battery capacity and current level (%), computes whether the trip
 * can be completed and the remaining battery after the trip.
 *
 * @param batteryCapacityKWh Nominal battery capacity in kWh.
 * @param batteryLevelPercent Current battery level as a percentage [0–100].
 * @param totalConsumptionKWh Total estimated trip consumption in kWh.
 * @returns Object with:
 *  - canCompleteTrip: true if available energy covers the trip consumption.
 *  - remainingBatteryKWh: remaining energy (kWh) after the trip (clamped at 0).
 *  - remainingBatteryPercent: remaining battery percentage after the trip.
 * @example
 * // Capacity 60 kWh, 50% battery, trip 20 kWh
 * // -> possible, 10 kWh left, ~16.67%
 * // calculateBatteryUsage(60, 50, 20)
 */
export function calculateBatteryUsage(
  batteryCapacityKWh: number,
  batteryLevelPercent: number,
  totalConsumptionKWh: number
): { canCompleteTrip: boolean; remainingBatteryKWh: number; remainingBatteryPercent: number } {
  // Available energy given the current battery level
  const availableBatteryKWh = (batteryCapacityKWh * batteryLevelPercent) / 100;
  // The trip is feasible if available energy covers the estimated consumption
  const canCompleteTrip = availableBatteryKWh >= totalConsumptionKWh;
  // Remaining energy clamped at 0 to avoid negative values
  const remainingBatteryKWh = Math.max(0, availableBatteryKWh - totalConsumptionKWh);
  // Convert remaining energy to percentage of total capacity
  const remainingBatteryPercent = (remainingBatteryKWh / batteryCapacityKWh) * 100;

  return {
    canCompleteTrip,
    remainingBatteryKWh,
    remainingBatteryPercent
  };
}
