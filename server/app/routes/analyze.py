from flask import Blueprint, request, jsonify
import re
from app.services.youtube import youtube_comments 
from app.cache.redis import get_cache, set_cache

analyze_bp = Blueprint('analyze', __name__)

@analyze_bp.route('/analyse', methods=['POST'])
def analyze():
    data = request.get_json()
    url = data.get('url')

    if not url:
        return jsonify({'error': 'Missing URL'}), 400

    print(f"site to scrape: {url}")

    video_id = None

    if "youtube" in url:
        match = re.search(r"v=([a-zA-Z0-9_-]+)", url)
        if match:
            video_id = match.group(1)
    elif "youtu.be" in url:
        match = re.search(r"youtu\.be/([a-zA-Z0-9_-]+)", url)
        if match:
            video_id = match.group(1)
    else:
        return jsonify({'error': 'Not a YouTube link'}), 400

    if not video_id:
        return jsonify({'error': 'Invalid YouTube URL'}), 400

    cached = get_cache(video_id)
    if cached:
        return jsonify(cached), 200

    response = youtube_comments(video_id)

    set_cache(video_id, response)

    return jsonify(response), 200

