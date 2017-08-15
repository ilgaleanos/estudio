from rest_framework import serializers
from libros.models import Libro


class LibroSerializer(serializers.Serializer):
    Id = serializers.IntegerField(read_only=True)
    Nombre = serializers.CharField(
        required=True, max_length=50)
    Fecha = serializers.DateTimeField(required=True)

    def create(self, validated_data):
        """
        Create and return a new `Snippet` instance, given the validated data.
        """
        return Libro.objects.create(**validated_data)

    def update(self, instance, validated_data):
        """
        Update and return an existing `Snippet` instance, given the validated data.
        """
        instance.Nombre = validated_data.get('Nombre', instance.Nombre)
        instance.Fecha = validated_data.get('Fecha', instance.Fecha)
        instance.save()
        return instance
