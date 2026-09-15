import django
import os
import sys
import json
import requests

from kafka import KafkaConsumer

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "service_project.settings")
django.setup()

from service_rest.models import AutomobileVO

KAFKA_BOOTSTRAP_SERVERS = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "kafka:9092")
INVENTORY_API_URL = "http://inventory-api:8000/api/automobiles/"


def upsert_automobile(vin, sold):
    if vin is None or sold is None:
        return
    AutomobileVO.objects.update_or_create(vin=vin, defaults={"sold": sold})


def backfill():
    # One-time snapshot of current inventory state on startup - Kafka only
    # carries events from whenever this consumer group first connects, so
    # anything created before that point needs to come from the REST API.
    try:
        response = requests.get(INVENTORY_API_URL)
        response.raise_for_status()
        for automobile in response.json().get("autos", []):
            upsert_automobile(automobile.get("vin"), automobile.get("sold"))
        print("Backfill complete")
    except Exception as error:
        print(f"Backfill failed: {error}", file=sys.stderr)


def consume():
    consumer = KafkaConsumer(
        "automobiles",
        bootstrap_servers=KAFKA_BOOTSTRAP_SERVERS,
        group_id="service-poller",
        auto_offset_reset="latest",
        value_deserializer=lambda value: json.loads(value.decode("utf-8")),
    )
    print("Listening for automobile events...")
    for message in consumer:
        event = message.value
        print(f"Received event: {event}")
        try:
            upsert_automobile(event.get("vin"), event.get("sold"))
        except Exception as error:
            print(f"Failed to process event {event}: {error}", file=sys.stderr)


if __name__ == "__main__":
    backfill()
    consume()
