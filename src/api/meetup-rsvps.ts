export default async function handler(req: any, res: any) {
  const { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.status(400).json({ error: 'Meetup URL is required' });
  }

  try {
    // Fetch the public Meetup event page
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      },
    });
    
    if (!response.ok) throw new Error('Failed to fetch Meetup page');
    
    const html = await response.text();

    // Meetup embeds the exact RSVP count in their page metadata under "going"
    const rsvpMatch = html.match(/"going":(\d+)/);
    const count = rsvpMatch && rsvpMatch[1] ? parseInt(rsvpMatch[1], 10) : 0;

    return res.status(200).json({ count });
  } catch (error) {
    console.error('Meetup Fetch Error:', error);
    return res.status(500).json({ error: 'Failed to fetch RSVP count', count: 0 });
  }
}
