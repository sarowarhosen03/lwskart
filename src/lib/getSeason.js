import { auth } from '@/auth'
import { caches } from 'react'
export default function getSeason() {
    return caches(auth)
}
