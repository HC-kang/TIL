FROM python:3.9.0

WORKDIR /home/

RUN echo "testing123412341234"

RUN git clone https://github.com/HC-kang/pinter.git

WORKDIR /home/pinter/

RUN pip install -r requirements.txt

RUN pip install gunicorn

RUN pip install mysqlclient

WORKDIR /home/pinter/inventory/

EXPOSE 8000

CMD ["bash", "-c", "python manage.py collectstatic --noinput --settings=inventory.settings.deploy && python manage.py migrate --settings=inventory.settings.deploy && gunicorn inventory.wsgi --env DJANGO_SETTINGS_MODULE=inventory.settings.deploy --bind 0.0.0.0:8000"]