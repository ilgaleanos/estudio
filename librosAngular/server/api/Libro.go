package api

import (
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"log"
	"time"
)

type Libro struct {
	Id     int
	Nombre string
	Fecha  time.Time
}

var (
	Db    *pgx.ConnPool
	Local *time.Location
)

func Libro_listar(c *gin.Context) {
	rows, err := Db.Query(`SELECT "Libros"."Id", "Libros"."Nombre", "Libros"."Fecha" From "Libros"`)
	if err != nil {
		log.Println(err)
	}
	var libro Libro
	var libros []Libro
	for rows.Next() {
		err = rows.Scan(&libro.Id, &libro.Nombre, &libro.Fecha)
		if err != nil {
			log.Println(err)
			c.JSON(500, gin.H{"R": 1})
			return
		}
		libros = append(libros, libro)
	}

	c.JSON(200, gin.H{"Libros": libros})
	return
}

func Libro_obtener(c *gin.Context) {
	var libro Libro
	err := Db.QueryRow(`
		SELECT "Libros"."Id", "Libros"."Nombre", "Libros"."Fecha" FROM "Libros" WHERE "Libros"."Id" = $1; `,
		c.Param("id")).Scan(
		&libro.Id,
		&libro.Nombre,
		&libro.Fecha)

	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"R": 1})
		return
	}

	c.JSON(200, gin.H{"R": 0, "Libro": libro})
	return
}

func Libro_guardar(c *gin.Context) {
	libro := Libro{Nombre: c.PostForm("Nombre")}
	err := Db.QueryRow(`
		INSERT INTO "Libros" ("Nombre", "Fecha") VALUES ( $1, $2) RETURNING "Id", "Fecha";`,
		libro.Nombre, c.PostForm("Fecha")).Scan(&libro.Id, &libro.Fecha)
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"R": 1})
		return
	}

	c.JSON(200, gin.H{"Libro": libro, "R": 0})
	return
}

func Libro_actualizar(c *gin.Context) {
	_, err := Db.Exec(`
		UPDATE "Libros" SET "Nombre" = $1,  "Fecha" = $2 WHERE "Libros"."Id"= $3;`,
		c.PostForm("Nombre"), c.PostForm("Fecha"), c.Param("id"))
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"R": 1})
		return
	}

	c.JSON(200, gin.H{"R": 0})
	return
}

func Libro_eliminar(c *gin.Context) {
	_, err := Db.Exec(`
		DELETE FROM "Libros" WHERE "Libros"."Id"= $1;`, c.Param("id"))
	if err != nil {
		log.Println(err)
		c.JSON(500, gin.H{"R": 1})
		return
	}

	c.JSON(200, gin.H{"R": 0})
	return
}

func Headers() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "origin, x-requested-with, content-type")
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	}
}
