'use server'

import { redirect } from "next/navigation"

function redirectFromServer(url) {
    redirect(url)
}