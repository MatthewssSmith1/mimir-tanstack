/// <reference types="vinxi/types/server" />
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server'
import { createClerkHandler } from '@clerk/tanstack-react-start/server'
import { getRouterManifest } from '@tanstack/react-start/router-manifest'
import { createRouter } from './router'

const handler = createStartHandler({ createRouter, getRouterManifest })

const clerkHandler = createClerkHandler(handler)

export default clerkHandler(defaultStreamHandler)
