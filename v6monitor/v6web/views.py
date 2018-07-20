from django.http import HttpResponse, JsonResponse
from django.shortcuts import render
from . import result

# Create your views here.

def index(request):

    # return JsonResponse(result.gov())

    return render(request,'index.html')
    # return JsonResponse(dict(result=result))
def university(request):
    return render(request,'university.html')
def commercial(request):
    return render(request,'commercial.html')
def goverment(request):
    return render(request,'goverment.html') 

def googlemap(request):
    return render(request,'global.html')  

def gov(request):
    return JsonResponse(result.gov())

def com(request):
    return JsonResponse(result.com())

def edu(request):
    return JsonResponse(result.edu())

def v6block(request):
    return JsonResponse(result.v6block())
