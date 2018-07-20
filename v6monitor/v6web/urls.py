"""v6monitor URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin
from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^university/$', views.university, name='university'),
    url(r'^commercial/$', views.commercial, name='commercial'),
    url(r'^goverment/$', views.goverment, name='goverment'),
    url(r'^global/$', views.googlemap, name='googlemap'),
    url(r'^gov/$', views.gov, name='gov'),
    url(r'^com/$', views.com, name='com'),
    url(r'^edu/$', views.edu, name='edu'),
    url(r'^v6block/$', views.v6block, name='v6block'),
]
