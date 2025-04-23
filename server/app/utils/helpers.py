import re

def remove_emoji(text):
    text = text.replace("❤", "")
    emoji_pattern = re.compile("[\U00010000-\U0010ffff]", flags=re.UNICODE)
    return emoji_pattern.sub(r'', text)
