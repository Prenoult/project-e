"use client"

import * as React from "react"
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { EV_VEHICLES } from "@/data/vehicles"

type ComboboxProps = {
  value?: string
  onChange?: (value: string | undefined) => void
  placeholder?: string
}

export function Combobox({ value: controlledValue, onChange, placeholder = "Sélectionner un véhicule..." }: ComboboxProps) {
  const [open, setOpen] = React.useState(false)
  const [uncontrolled, setUncontrolled] = React.useState("")
  const value = controlledValue ?? uncontrolled

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? (() => {
                const v = EV_VEHICLES.find((veh) => veh.value === value)
                return v ? `${v.label} — ${v.capacityKWh} kWh` : placeholder
              })()
            : placeholder}
          <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Rechercher un véhicule..." />
          <CommandList>
            <CommandEmpty>Aucun véhicule trouvé.</CommandEmpty>
            <CommandGroup>
              {EV_VEHICLES.map((veh) => (
                <CommandItem
                  key={veh.value}
                  value={veh.value}
                  onSelect={(currentValue) => {
                    const next = currentValue === value ? "" : currentValue
                    if (onChange) {
                      onChange(next || undefined)
                    } else {
                      setUncontrolled(next)
                    }
                    setOpen(false)
                  }}
                >
                  <CheckIcon
                    className={cn(
                      "mr-2 h-4 w-4",
                      value === veh.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {veh.label} — {veh.capacityKWh} kWh
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
