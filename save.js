export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ status: 'error', message: 'Method not allowed' });
  }

  try {
    // Ganti dengan URL Google Apps Script kamu
    const scriptURL = 'https://script.google.com/macros/s/AKfycbz7GvZqQDVN_GLOW_FORM_REPORT/exec';

    const response = await fetch(scriptURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req.body),
    });

    // Karena Apps Script bisa return plain text, kita parse aman
    let text = await response.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { status: 'ok', raw: text };
    }

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
}
