FROM python:3.8

RUN /usr/local/bin/python -m pip install --upgrade pip
WORKDIR /app
COPY requirements.txt ./
RUN pip3 install -r requirements.txt
COPY . .
CMD "python3" "app.py"