export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        let i = 0;
        setInterval(() => {
            console.log(i++);
        }, 5000)

    }
}