
export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const param = searchParams.get("countOnly");
    // const { user: { id } } = await auth()
    // console.log(id);
    return Response.json({ ok: 'jf' })
}