from urllib.parse import urlparse
from flask import request

ALLOWED_HOSTS = {'api.trusted.com', 'cdn.example.com'}

@app.route('/fetch')
def fetch_url():
    target_url = request.args.get('url')
    if not target_url:
        return jsonify({"error": "URL required"}), 400

    parsed = urlparse(target_url)
    if parsed.hostname not in ALLOWED_HOSTS or parsed.scheme not in ['http', 'https']:
        return jsonify({"error": "SSRF protection: URL not allowed"}), 403

    try:
        response = requests.get(target_url, timeout=5)
        return response.text
    except Exception:
        return jsonify({"error": "Request failed"}), 500