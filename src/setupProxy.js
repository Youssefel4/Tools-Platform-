const https = require('https');

module.exports = function(app) {
  app.get('/api/tts', (req, res) => {
    const text = req.query.q || req.query.text || '';
    const lang = req.query.tl || req.query.lang || 'en';

    if (!text.trim()) {
      return res.status(400).json({ error: 'Missing text parameter' });
    }

    const googleTtsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=${encodeURIComponent(lang)}&q=${encodeURIComponent(text.trim())}`;

    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Referer': 'https://translate.google.com/',
        'Accept': 'audio/mpeg, audio/*;q=0.9, */*;q=0.8'
      }
    };

    const proxyReq = https.get(googleTtsUrl, options, (upstreamRes) => {
      const contentType = upstreamRes.headers['content-type'] || '';

      if (upstreamRes.statusCode !== 200 || contentType.includes('text/html')) {
        return res.status(502).json({ error: 'Upstream TTS returned non-audio response' });
      }

      res.setHeader('Content-Type', 'audio/mpeg');
      res.setHeader('Content-Disposition', 'inline; filename="voice.mp3"');
      res.setHeader('Cache-Control', 'public, max-age=86400');
      upstreamRes.pipe(res);
    });

    proxyReq.on('error', (err) => {
      res.status(500).json({ error: err.message });
    });
  });
};
