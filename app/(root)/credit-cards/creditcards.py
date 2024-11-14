import praw
import time
import json
import os
from datetime import datetime

# Setup for Reddit API access
reddit = praw.Reddit(
    client_id='R3Bh5YSJZP2i_iE2Gjd_pA',
    client_secret='NWnoliLAjVdq-s0qheEBLTNYqPsEXA',
    user_agent='ReferLoop:v1.0 (by u/Straight-Prior-1579)'
)

# Choose the subreddit to scrape
subreddit = reddit.subreddit('churningreferrals')

# Get the current time in seconds since the epoch
current_time = time.time()

# Time window for the last 2 days (2 days * 3600 seconds)
time_window = 2 * 24 * 60 * 60  # 48 hours

# Fetch posts from the last 2 days
posts = subreddit.new(limit=10)

# Function to extract the credit card name from the title
def extract_card_name(post_title):
    card_name = post_title.replace("[referrals]", "").strip()  # Remove '[referrals]'
    return card_name

# Function to extract all comments, excluding those with 'rankt-bot' or 'MOD'
def extract_all_comments(comments):
    all_comments = []
    for comment in comments:
        if 'rankt-bot' not in comment.body.lower() and 'mod' not in comment.body.lower():
            all_comments.append(comment.body)  # Collect valid comment bodies as referral links
    return all_comments

# Function to format the date when the post was scraped (month, day, year)
def format_scraped_date(utc_timestamp):
    # Convert the UTC timestamp to a datetime object
    post_date = datetime.utcfromtimestamp(utc_timestamp)
    # Format the date as Month Day, Year
    return post_date.strftime('%B %d, %Y')

# Prepare the data to write to JSON
posts_data = []

# Loop through the posts and gather relevant information
for post in posts:
    if current_time - post.created_utc <= time_window:
        card_name = extract_card_name(post.title)
        if card_name:
            post_data = {
                "creditCard": card_name,
                "comments": extract_all_comments(post.comments),
                "Date": format_scraped_date(post.created_utc)  # Add the scraped date
            }
            posts_data.append(post_data)

# Define the directory where you want to save the file
directory = os.path.join("app", "(root)", "credit-cards")
# Ensure the directory exists
os.makedirs(directory, exist_ok=True)

# Define the full path for the output file
output_file_path = os.path.join(directory, "referral_posts.json")

# Write the data to the desired location
with open(output_file_path, "w") as outfile:
    json.dump(posts_data, outfile, indent=4)  # Adding indent for better readability

print(f"Output written to {output_file_path}")
