import React, {FC, PropsWithChildren} from 'react'
import { FathomAnalytics } from '../FathomAnalytics'

const Root: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      {children}
      <FathomAnalytics />
    </>
  )
}

export default Root
