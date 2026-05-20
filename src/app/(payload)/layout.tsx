import { RootLayout, handleServerFunctions } from '@payloadcms/next/layouts'
import React from 'react'
import '@payloadcms/next/css'

import { importMap } from './admin/importMap'
import config from '@payload-config'

type Args = {
  children: React.ReactNode
}

const serverFunction = async function (args: any) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    {children}
  </RootLayout>
)

export default Layout
