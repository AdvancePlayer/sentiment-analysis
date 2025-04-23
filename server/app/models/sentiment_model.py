from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import torch.nn.functional as F

MODEL_NAME = "cardiffnlp/twitter-roberta-base-sentiment"
tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
model = AutoModelForSequenceClassification.from_pretrained(MODEL_NAME)

label_map = {0: "negative", 1: "neutral", 2: "positive"}

def analyse_data(comments):
    batch = tokenizer(comments, padding=True, truncation=True, max_length=512, return_tensors="pt")

    with torch.no_grad():
        output = model(**batch)
        predictions = F.softmax(output.logits, dim=1)
        predicted_labels = torch.argmax(predictions, dim=1)

    labels = [label_map[label.item()] for label in predicted_labels]

    total_comments = len(comments)
    sentiment_counts = {
        'positive': labels.count('positive'),
        'negative': labels.count('negative'),
        'neutral': labels.count('neutral')
    }

    percentages = {sentiment: round((count / total_comments) * 100, 2)
                   for sentiment, count in sentiment_counts.items()}

    overall_result = max(percentages, key=percentages.get)

    result = {
        "overall_result": overall_result.capitalize(),
        "total_positive": percentages['positive'],
        "total_negative": percentages['negative'],
        "total_neutral": percentages['neutral'],
        "comments_used_in_analysis": total_comments
    }

    return result
