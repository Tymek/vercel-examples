import { FC } from 'react'

export const Toggle: FC<{ enabled?: boolean }> = ({ enabled }) => (
  <span
    className={`mx-1 font-bold text-xl ${
      enabled ? 'text-green-500' : 'text-red-500'
    }`}
  >
    {enabled ? 'on' : 'off'}
  </span>
)
