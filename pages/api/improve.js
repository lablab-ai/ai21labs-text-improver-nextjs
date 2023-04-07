export default async function handler(req, res) {
  if (req.method === "POST") {
    const improvements = await fetch(
      "https://api.ai21.com/studio/v1/improvements",
      {
        method: 'POST',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: `Bearer ${process.env.API_KEY}`
        },
        body: JSON.stringify({
          types: [
            'fluency',
            'vocabulary/specificity',
            'vocabulary/variety',
            'clarity/short-sentences',
            'clarity/conciseness'
          ],
          text: req.body.text
        })
      }
    ).then((res) => res.json())
    res.status(200).json(improvements)
  } else {
    res.status(405).json({ message: "Method not allowed" })
  }
}