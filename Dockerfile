FROM python:3.8-slim

WORKDIR /app

COPY . .

RUN apt-get update
RUN apt-get install -y python3 python3-pip python3-venv

RUN pip freeze > requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

CMD ["python3", "main.py"]
