import redis
import json
import hashlib
from datetime import timedelta
from urllib.parse import urlparse
import os

redis_url = os.getenv("REDIS_URL")
url = urlparse(redis_url)

r = redis.Redis(
    host=url.hostname,
    port=url.port,
    decode_responses=True,
    username=url.username,
    password=url.password,
    ssl=url.scheme == "rediss"
)


def _key(url):
    return hashlib.sha256(url.encode()).hexdigest()

def get_cache(video_url):
    data = r.get(_key(video_url))
    if data:
        return json.loads(data)
    return None

def set_cache(video_url, result, ttl=timedelta(hours=6)):
    r.setex(_key(video_url), ttl, json.dumps(result))
