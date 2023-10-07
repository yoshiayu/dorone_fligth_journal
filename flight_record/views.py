from django.shortcuts import render, redirect
from .forms import FlightRecordForm
from django.http import JsonResponse
from .models import FlightRecord
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt  # Normally, for POST requests, CSRF token is needed. We omit it here for simplicity
def save_record(request):
    if request.method == "POST":
        data = json.loads(request.body)
        record = FlightRecord(**data)
        record.save()
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "fail"})

def flight_record(request):
    if request.method == "POST":
        form = FlightRecordForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'index.html', {})
    else:
        form = FlightRecordForm()
    return render(request, 'flight_record/index.html', {'form': form})
