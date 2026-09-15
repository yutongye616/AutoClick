import json
import os

from kafka import KafkaProducer

BOOTSTRAP_SERVERS = os.environ.get("KAFKA_BOOTSTRAP_SERVERS", "kafka:9092")
AUTOMOBILE_TOPIC = "automobiles"

_producer = None


def _get_producer():
    global _producer
    if _producer is None:
        _producer = KafkaProducer(
            bootstrap_servers=BOOTSTRAP_SERVERS,
            value_serializer=lambda value: json.dumps(value).encode("utf-8"),
            retries=5,
        )
    return _producer


def publish_automobile_event(action, vin, sold):
    # Producing must never take down automobile create/update - if Kafka
    # is unreachable, the REST API still succeeds and consumers just miss
    # this event (recoverable via their startup backfill).
    try:
        producer = _get_producer()
        producer.send(AUTOMOBILE_TOPIC, {"action": action, "vin": vin, "sold": sold})
        producer.flush(timeout=5)
    except Exception as error:
        print(f"Failed to publish automobile event: {error}")
