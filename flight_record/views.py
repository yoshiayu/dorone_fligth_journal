from django.shortcuts import render, redirect
from .forms import FlightRecordForm
from django.http import JsonResponse
from .models import FlightRecord
from django.views.decorators.csrf import csrf_exempt
import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
from django.contrib.auth.decorators import login_required

@csrf_exempt  # Normally, for POST requests, CSRF token is needed. We omit it here for simplicity
def save_record(request):
    if request.method == "POST":
        data = json.loads(request.body)
        record = FlightRecord(**data)
        record.save()
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "fail"})

@login_required
def flight_record(request):
    if request.method == "POST":
        form = FlightRecordForm(request.POST)
        if form.is_valid():
            form.save()
            return render(request, 'index.html', {})
    else:
        form = FlightRecordForm()
    return render(request, 'flight_record/index.html', {'form': form})

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(data=request.POST)
        if form.is_valid():
            user = form.get_user()
            login(request, user)
            return redirect('flight_record')
    else:
        form = AuthenticationForm()
    return render(request, 'flight_record/login.html', {'form': form})

def user_signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            new_user = authenticate(username=form.cleaned_data['username'],
                                    password=form.cleaned_data['password1'])
            login(request, new_user)
            return redirect('flight_record')
    else:
        form = UserCreationForm()
    return render(request, 'flight_record/signup.html', {'form': form})
