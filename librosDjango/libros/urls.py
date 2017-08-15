from django.conf.urls import url
from libros import views

urlpatterns = [
    url(r'^libros/$', views.libros_list),
    url(r'^libros/(?P<pk>[0-9]+)/$', views.libros_detail),
]
