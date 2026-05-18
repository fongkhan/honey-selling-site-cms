import { NotFoundPage, generatePageMetadata } from '@payloadcms/next/views'
import { importMap } from '../importMap'

type Args = {
  params: Promise<{
    segments: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[] | undefined
  }>
}

export async function generateMetadata({ params, searchParams }: Args) {
  return generatePageMetadata({ config: importMap, params, searchParams })
}

export default async function NotFound({ params, searchParams }: Args) {
  return NotFoundPage({ config: importMap, params, searchParams })
}
