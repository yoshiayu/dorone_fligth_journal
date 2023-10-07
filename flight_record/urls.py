from django.urls import path
from .views import flight_record
from . import views

urlpatterns = [
    # path('', views.flight_record, name='flight_record'),
    path('flight_record/', flight_record, name='flight_record'),
    path('save_record/', views.save_record, name='save_record'),
]
