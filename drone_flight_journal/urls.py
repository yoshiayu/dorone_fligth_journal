from django.contrib import admin
from django.urls import path, include
from django.shortcuts import redirect

urlpatterns = [
    path('', lambda request: redirect('login/', permanent=False)),
    path('admin/', admin.site.urls),
    path('login/', include('login.urls')),
    path('flight_record/', include('flight_record.urls')),
    path('maintenance_record/', include('maintenance_record.urls')),
]
