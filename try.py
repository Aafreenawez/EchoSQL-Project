import google.generativeai as genai

genai.configure(api_key="AIzaSyADBp3HeF9IqH3KxkLQF2ZE1bvA7dGcZK4")
models = genai.list_models()

for model in models:
    print(model.name)
