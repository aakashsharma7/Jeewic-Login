import * as Select from '@radix-ui/react-select'
import { ChevronDownIcon } from '@radix-ui/react-icons'

interface SelectProps {
  options: { label: string; value: string }[]
  defaultValue?: string
  onValueChange?: (value: string) => void
}

export function CustomSelect({ options, defaultValue, onValueChange }: SelectProps) {
  return (
    <Select.Root defaultValue={defaultValue} onValueChange={onValueChange}>
      <Select.Trigger className="inline-flex items-center justify-between bg-white border border-gray-200 rounded-md px-3 py-1.5 text-sm text-gray-800 hover:border-orange-300 focus:border-orange-500 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500/25 gap-2">
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon className="h-4 w-4 text-gray-400" />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white border border-gray-200 rounded-md shadow-lg">
          <Select.Viewport>
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="text-sm text-gray-800 px-3 py-2 hover:bg-orange-50 hover:text-orange-700 focus:outline-none focus:bg-orange-50 cursor-pointer"
              >
                <Select.ItemText>{option.label}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}
