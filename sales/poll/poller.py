import django
import os
import sys
import json
import requests

from kafka import KafkaConsumer
from django.db import transaction

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

from sales_rest.models import AutomobileVO

KAFKA_BOOTSTRAP_SERVERS = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "kafka:9092")
INVENTORY_API_URL = "http://project-beta-inventory-api-1:8000/api/automobiles/"


def upsert_automobile(vin, sold):
    if vin is None or sold is None:
        print(f"Skipping invalid automobile data: vin={vin}, sold={sold}")
        return
    with transaction.atomic():
        AutomobileVO.objects.update_or_create(vin=vin, defaults={"sold": sold})
    print(f"Updated AutomobileVO with VIN: {vin}, Sold: {sold}")


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
        group_id="sales-poller",
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
