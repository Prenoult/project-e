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
