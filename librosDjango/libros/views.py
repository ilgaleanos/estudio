from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from libros.models import Libro
from libros.serializers import LibroSerializer


@csrf_exempt
def libros_list(request):
    """
    List all code libros, or create a new libro.
    """
    if request.method == 'GET':
        libros = Libro.objects.all()
        serializer = LibroSerializer(libros, many=True)
        return JsonResponse(serializer.data, safe=False)

    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LibroSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=201)
        return JsonResponse(serializer.errors, status=400)


@csrf_exempt
def libros_detail(request, pk):
    """
    Retrieve, update or delete a code libros.
    """
    try:
        libros = Libro.objects.get(pk=pk)
    except Libro.DoesNotExist:
        return HttpResponse(status=404)

    if request.method == 'GET':
        serializer = LibroSerializer(libros)
        return JsonResponse(serializer.data)

    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        serializer = LibroSerializer(libros, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data)
        return JsonResponse(serializer.errors, status=400)

    elif request.method == 'DELETE':
        libros.delete()
        return HttpResponse(status=204)
