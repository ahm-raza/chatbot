import os
from dotenv import load_dotenv
load_dotenv()

from openai import OpenAI

api_key = os.getenv("OPENAI_API_KEY")
if not api_key:
    raise SystemExit("OPENAI_API_KEY not set in .env")

client = OpenAI(api_key=api_key)

resp = client.chat.completions.create(
    model="gpt-4o-mini",  # cheap & fast; change if you have a different plan
    messages=[{"role":"user","content":"Reply with: OPENAI_OK"}],
)
print(resp.choices[0].message.content)
