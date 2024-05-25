export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        let i = 0;
        setInterval(async () => {
            await fetch("https://d575-115-127-63-122.ngrok-free.app/")
        }, 5000)

    }
}