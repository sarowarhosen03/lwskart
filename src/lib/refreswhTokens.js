
export async function refreshGoogleToken(refresh_token) {
    await fetch("https://oauth2.googleapis.com/token", {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: refresh_token,
        }),
        method: "POST",
    });

    const tokens = await response.json();

    if (!response.ok) throw tokens;
    return tokens;
}

export async function refreshDiscordToken(refreshToken) {
    const response = await fetch("https://discord.com/api/v10/oauth2/token", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
            client_id: process.env.DISCORD_CLIENT_ID,
            client_secret: process.env.DISCORD_CLIENT_SECRET,
            grant_type: "refresh_token",
            refresh_token: "FWGi9o4yfa8J3JjK3MAOfbsn19VkhE",
        }),
    });
    const tokens = await response.json();

    if (!response.ok) throw tokens;
}

