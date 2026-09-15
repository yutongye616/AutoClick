from django.db import models
from django.urls import reverse

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=10)



class Appointment(models.Model):
    date_time = models.DateTimeField(default=None, blank=True, null=True)
    service_reason = models.CharField(max_length=500)
    status = models.CharField(max_length=20, default="TBD")
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=300)
    vip = models.BooleanField(default=False)
    
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.CASCADE,
    )
