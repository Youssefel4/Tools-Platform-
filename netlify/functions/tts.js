const https = require('https');

exports.handler = async function(event, context) {
  // Support both GET query parameters
  const params = event.queryStringParameters || {};
  const text = params.q || params.text || '';
  const lang = params.tl || params.lang || 'en';

  if (!text.trim()) {
    return {
      statusCode: 400,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Missing text parameter' })
    };
  }

  // Google Translate TTS URL
  const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(text.trim())}`;

  return new Promise((resolve) => {
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
        'Accept': 'audio/mpeg, audio/*;q=0.9, */*;q=0.8'
      }
    };

    const req = https.get(googleTtsUrl, options, (res) => {
      const contentType = res.headers['content-type'] || '';

      if (res.statusCode !== 200 || contentType.includes('text/html')) {
        return resolve({
          statusCode: 502,
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ error: 'Upstream TTS service returned non-audio response' })
        });
      }

      const chunks = [];
      res.on('data', (chunk) => chunks.push(chunk));
      res.on('end', () => {
        const buffer = Buffer.concat(chunks);
        resolve({
          statusCode: 200,
          isBase64Encoded: true,
          headers: {
            'Content-Type': 'audio/mpeg',
            'Content-Disposition': 'inline; filename="voice.mp3"',
            'Cache-Control': 'public, max-age=86400',
            'Access-Control-Allow-Origin': '*'
          },
          body: buffer.toString('base64')
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        statusCode: 500,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: err.message })
      });
    });

    req.setTimeout(8000, () => {
      req.destroy();
      resolve({
        statusCode: 504,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'TTS request timed out' })
      });
    });
  });
};
