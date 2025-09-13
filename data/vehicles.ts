export type ElectricVehicle = {
  value: string
  label: string
  capacityKWh: number
}

// TODO: Search real capacities from manufacturers' specs.
export const EV_VEHICLES: ElectricVehicle[] = [
  { value: "tesla-model-3-performance", label: "Tesla Model 3 Performance", capacityKWh: 82 },
  { value: "tesla-model-3-rwd", label: "Tesla Model 3 RWD", capacityKWh: 60 },
  { value: "tesla-model-y-long-range", label: "Tesla Model Y Long Range", capacityKWh: 75 },
  { value: "renault-zoe-r135", label: "Renault Zoe R135", capacityKWh: 52 },
  { value: "peugeot-e-208", label: "Peugeot e-208", capacityKWh: 54 },
  { value: "hyundai-kona-64", label: "Hyundai Kona Electric 64 kWh", capacityKWh: 64 },
  { value: "kia-ev6-long-range", label: "Kia EV6 Long Range", capacityKWh: 77.4 },
  { value: "bmw-i4-edrive40", label: "BMW i4 eDrive40", capacityKWh: 81 },
  { value: "dacia-spring", label: "Dacia Spring", capacityKWh: 27.4 },
  { value: "nissan-leaf-40", label: "Nissan Leaf 40", capacityKWh: 40 },
  { value: "vw-id3-pro", label: "Volkswagen ID.3 Pro", capacityKWh: 58 },
  { value: "tesla-model-s-plaid", label: "Tesla Model S Plaid", capacityKWh: 100 },
  { value: "audi-e-tron-55", label: "Audi e-tron 55", capacityKWh: 95 },
  { value: "mercedes-eqs-450-plus", label: "Mercedes EQS 450+", capacityKWh: 108 },
  { value: "mg4-standard", label: "MG4 Standard", capacityKWh: 51 },
  { value: "fiat-500e-long-range", label: "Fiat 500e Long Range", capacityKWh: 48 },
  { value: "opel-corsa-e-xl", label: "Opel Corsa-e XL", capacityKWh: 62 },
  { value: "toyota-bz3-performance", label: "Toyota bZ3 Performance", capacityKWh: 72 },
]

