export const runtime = 'edge';

export async function POST(request: Request) {
    try {
        const { name, value } = await request.json();

        if (!name || !value) {
            return new Response(
                JSON.stringify({ message: 'Record Name and Value are required' }),
                { status: 400 }
            );
        }

        const token = process.env.CF_API_TOKEN;
        const zoneId = process.env.CF_ZONE_ID;

        if (!token || !zoneId) {
            return new Response(
                JSON.stringify({ message: 'Missing Cloudflare credentials' }),
                { status: 500 }
            );
        }

        const cloudflareRes = await fetch(`https://api.cloudflare.com/client/v4/zones/${zoneId}/dns_records`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                type: 'TXT',
                name,
                content: value,
            }),
        });

        const data = await cloudflareRes.json();

        if (!cloudflareRes.ok) {
            return new Response(
                JSON.stringify({ message: data?.errors?.[0]?.message || 'Cloudflare API error' }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (err) {
        return new Response(
            JSON.stringify({ message: (err as Error).message || 'Unexpected error' }),
            { status: 500 }
        );
    }
}
