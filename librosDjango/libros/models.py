from django.db import models


class Libro(models.Model):
    Id = models.AutoField(primary_key=True)
    Fecha = models.DateTimeField(auto_now_add=True)
    Nombre = models.CharField(max_length=50, blank=True, default='')

    def __str__(self):
        return "{0}".format(self.Id)

    class Meta:
        managed = True
        db_table = 'Libros'
        verbose_name_plural = "Libros"
