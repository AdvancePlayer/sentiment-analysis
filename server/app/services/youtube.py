from googleapiclient.discovery import build
from app.utils.helpers import remove_emoji
from app.models.sentiment_model import analyse_data
import os
 
youtube_key = os.getenv("YOUTUBE_API_KEY")

def youtube_comments(video_id):
    youtube = build('youtube', 'v3', developerKey=youtube_key)

    comments = []
    next_page_token = None

    while True:
        request = youtube.commentThreads().list(
            part="snippet",
            videoId=video_id,
            maxResults=100,
            pageToken=next_page_token
        )
        response = request.execute()

        for item in response['items']:
            comment = remove_emoji(item['snippet']['topLevelComment']['snippet']['textDisplay'])
            comments.append(comment)

        next_page_token = response.get('nextPageToken')
        if not next_page_token:
            break

    print(f"Total comments fetched: {len(comments)}")

    request = youtube.videos().list(
        part="snippet,statistics",
        id=video_id
    )
    response = request.execute()
    video_data = response['items'][0]

    video_details = {
        "video_title": video_data['snippet']['title'],
        "channel_title": video_data['snippet']['channelTitle'],
        "view_count": video_data['statistics']['viewCount'],
        "like_count": video_data['statistics'].get('likeCount', 'N/A'),
        "comment_count": video_data['statistics'].get('commentCount', 'N/A'),
        "thumbnail_url": video_data['snippet']['thumbnails']['high']['url']
    }

    print(video_details)

    result = analyse_data(comments)
    return {"result": result, "video_details": video_details}
