from django.db import models

class FlightRecord(models.Model):
    flight_date = models.DateField()
    pilot_name = models.CharField(max_length=200)  # Changed
    flight_summary = models.TextField()  # Changed
    departure_location = models.CharField(max_length=200)  # Changed
    landing_location = models.CharField(max_length=200)
    takeoff_time = models.TimeField()
    landing_time = models.TimeField()
    flight_time = models.DurationField()
    total_flight_time = models.DurationField()
    safety_issues = models.TextField()