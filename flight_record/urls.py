from django.urls import path
from . import views

app_name = 'flight_record'

urlpatterns = [
    path('', views.flight_record, name='index'),
    path('save_record/', views.save_record, name='save_record'),
]
