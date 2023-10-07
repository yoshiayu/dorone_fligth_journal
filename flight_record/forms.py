from django import forms
from .models import FlightRecord

class FlightRecordForm(forms.ModelForm):
    class Meta:
        model = FlightRecord
        fields = ['flight_date', 'pilot_name', 'flight_summary', 'departure_location']
