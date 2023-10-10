from django.contrib import admin
from django.urls import URLPattern, path, include
from django.shortcuts import redirect
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', lambda request: redirect('login:login', permanent=False)),  # これでデフォルトのURLをログインページにリダイレクトします。
    path('admin/', admin.site.urls),
    path('flight_record/', include('flight_record.urls')),
    path('login/', include('login.urls')),
]
if settings.DEBUG:
    urlpatterns = urlpatterns + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)