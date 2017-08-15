package main

import (
	api "./api"
	"github.com/gin-gonic/gin"
	"github.com/jackc/pgx"
	"runtime"
	"time"
)

func extractConfig() pgx.ConnConfig {
	var config pgx.ConnConfig

	config.Host = "127.0.0.1"
	config.User = "suidi"
	config.Password = "Su1357*-"
	config.Database = "libros"

	return config
}

func main() {
	var err error
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
	r.Use(api.Headers())
	/*==========================================================================
		Base de datos
	==========================================================================*/

	config := pgx.ConnPoolConfig{ConnConfig: extractConfig()}
	api.Db, err = pgx.NewConnPool(config)
	if err != nil {
		panic("Error conectando BD")
	}
	api.Local, err = time.LoadLocation("America/Bogota")

	/*==========================================================================
	*
	*	EN ESTAS RUTAS SE ENCUENTRAN LAS PAGINAS DEL FRONT
	*
	===========================================================================*/

	libro := r.Group("/libros/")
	{
		libro.GET("/", api.Libro_listar)
		libro.POST("/", api.Libro_guardar)
		libro.GET("/:id/", api.Libro_obtener)
		libro.PUT("/:id/", api.Libro_actualizar)
		libro.DELETE("/:id/", api.Libro_eliminar)
	}

	r.Run(":8080")
}

func init() {
	runtime.GOMAXPROCS(runtime.NumCPU())
}
