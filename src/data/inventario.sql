USE [master]
GO
/****** Object:  Database [inventario]    Script Date: 2/05/2023 3:04:12 p. m. ******/
CREATE DATABASE [inventario]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'inventario', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS2014\MSSQL\DATA\inventario.mdf' , SIZE = 4288KB , MAXSIZE = UNLIMITED, FILEGROWTH = 1024KB )
 LOG ON 
( NAME = N'inventario_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL12.SQLEXPRESS2014\MSSQL\DATA\inventario_log.ldf' , SIZE = 1072KB , MAXSIZE = 2048GB , FILEGROWTH = 10%)
GO
ALTER DATABASE [inventario] SET COMPATIBILITY_LEVEL = 120
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [inventario].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [inventario] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [inventario] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [inventario] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [inventario] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [inventario] SET ARITHABORT OFF 
GO
ALTER DATABASE [inventario] SET AUTO_CLOSE ON 
GO
ALTER DATABASE [inventario] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [inventario] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [inventario] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [inventario] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [inventario] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [inventario] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [inventario] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [inventario] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [inventario] SET  ENABLE_BROKER 
GO
ALTER DATABASE [inventario] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [inventario] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [inventario] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [inventario] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [inventario] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [inventario] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [inventario] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [inventario] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [inventario] SET  MULTI_USER 
GO
ALTER DATABASE [inventario] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [inventario] SET DB_CHAINING OFF 
GO
ALTER DATABASE [inventario] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [inventario] SET TARGET_RECOVERY_TIME = 0 SECONDS 
GO
ALTER DATABASE [inventario] SET DELAYED_DURABILITY = DISABLED 
GO
USE [inventario]
GO
/****** Object:  Table [dbo].[AlertaStock]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[AlertaStock](
	[IdAlerta] [int] IDENTITY(1,1) NOT NULL,
	[CantidadMinima] [int] NOT NULL,
	[IdArticulo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdAlerta] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Articulo]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Articulo](
	[IdArticulo] [int] IDENTITY(1,1) NOT NULL,
	[NombreArticulo] [varchar](100) NOT NULL,
	[DescripcionArticulo] [varchar](500) NOT NULL,
	[PrecioArticulo] [float] NOT NULL,
	[CantidadStock] [int] NOT NULL,
	[IdCategoria] [int] NOT NULL,
	[EstadoArticulo] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdArticulo] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[Categoria]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Categoria](
	[IdCategoria] [int] IDENTITY(1,1) NOT NULL,
	[NombreCategoria] [varchar](100) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdCategoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[EntradaArticulo]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[EntradaArticulo](
	[IdEntrada] [int] IDENTITY(1,1) NOT NULL,
	[FechaEntrada] [date] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[IdArticulo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdEntrada] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Pantalla]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Pantalla](
	[IdPantalla] [int] IDENTITY(1,1) NOT NULL,
	[NombrePantalla] [varchar](100) NOT NULL,
	[DescripcionPantalla] [varchar](500) NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdPantalla] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[SalidaArticulo]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SalidaArticulo](
	[IdSalida] [int] IDENTITY(1,1) NOT NULL,
	[FechaSalida] [date] NOT NULL,
	[Cantidad] [int] NOT NULL,
	[IdArticulo] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdSalida] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
/****** Object:  Table [dbo].[Usuario]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
SET ANSI_PADDING ON
GO
CREATE TABLE [dbo].[Usuario](
	[IdUsuario] [int] IDENTITY(1,1) NOT NULL,
	[NombreUsuario] [varchar](50) NOT NULL,
	[CorreoElectronico] [varchar](100) NOT NULL,
	[Contrasena] [varchar](100) NOT NULL,
	[EsAdmin] [bit] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdUsuario] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET ANSI_PADDING OFF
GO
/****** Object:  Table [dbo].[UsuarioPantalla]    Script Date: 2/05/2023 3:04:13 p. m. ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UsuarioPantalla](
	[IdUsuarioPantalla] [int] IDENTITY(1,1) NOT NULL,
	[IdUsuario] [int] NOT NULL,
	[IdPantalla] [int] NOT NULL,
PRIMARY KEY CLUSTERED 
(
	[IdUsuarioPantalla] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO
SET IDENTITY_INSERT [dbo].[AlertaStock] ON 

INSERT [dbo].[AlertaStock] ([IdAlerta], [CantidadMinima], [IdArticulo]) VALUES (7, 5, 14)
INSERT [dbo].[AlertaStock] ([IdAlerta], [CantidadMinima], [IdArticulo]) VALUES (8, 10, 21)
INSERT [dbo].[AlertaStock] ([IdAlerta], [CantidadMinima], [IdArticulo]) VALUES (9, 8, 23)
INSERT [dbo].[AlertaStock] ([IdAlerta], [CantidadMinima], [IdArticulo]) VALUES (10, 3, 24)
INSERT [dbo].[AlertaStock] ([IdAlerta], [CantidadMinima], [IdArticulo]) VALUES (11, 2, 15)
INSERT [dbo].[AlertaStock] ([IdAlerta], [CantidadMinima], [IdArticulo]) VALUES (12, 15, 26)
SET IDENTITY_INSERT [dbo].[AlertaStock] OFF
SET IDENTITY_INSERT [dbo].[Articulo] ON 

INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (14, N'Bicicleta de montaña', N'Bicicleta todo terreno con frenos de disco y suspensión delantera', 550, 10, 1, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (15, N'Bicicleta de ruta', N'Bicicleta de alta velocidad y desempeño para ciclistas profesionales', 1200, 5, 1, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (16, N'Casco de montaña', N'Casco de protección para ciclistas de montaña', 50, 20, 2, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (17, N'Casco de ruta', N'Casco de protección para ciclistas de ruta', 70, 15, 2, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (18, N'Guantes de ciclismo', N'Guantes de protección y agarre para ciclistas', 20, 30, 3, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (19, N'Zapatillas de ciclismo', N'Zapatillas con clip para mayor eficiencia en el pedaleo', 90, 10, 4, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (20, N'Sillín de bicicleta', N'Sillín de repuesto para bicicletas', 25, 50, 5, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (21, N'Pedales de bicicleta', N'Pedales de repuesto para bicicletas', 15, 40, 6, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (22, N'Bomba de aire para bicicleta', N'Bomba de aire portátil para inflar neumáticos de bicicleta', 30, 25, 7, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (23, N'Luces LED para bicicleta', N'Juego de luces LED para bicicleta', 12, 35, 8, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (24, N'Bicicleta de montaña', N'Bicicleta de montaña de alta resistencia para terrenos difíciles', 1500, 10, 2, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (25, N'Bicicleta de ruta', N'Bicicleta de ruta para competición', 2500, 5, 2, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (26, N'Casco', N'Casco para ciclismo de alta calidad', 100, 50, 3, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (27, N'Guantes', N'Guantes para ciclismo con protección contra impactos', 50, 30, 3, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (28, N'Zapatillas de ciclismo', N'Zapatillas de ciclismo para competición', 200, 20, 3, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (29, N'Llanta de repuesto', N'Llanta para bicicleta de montaña de 26 pulgadas', 50, 15, 4, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (30, N'Pedales', N'Pedales para bicicleta de ruta con sistema de clip', 75, 25, 4, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (31, N'Asiento', N'Asiento para bicicleta de paseo con almohadilla', 40, 20, 4, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (32, N'Espejos retrovisores', N'Espejos retrovisores para bicicletas de ruta', 20, 10, 4, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (33, N'Portabultos', N'Portabultos trasero para bicicletas de paseo', 35, 15, 4, 1)
INSERT [dbo].[Articulo] ([IdArticulo], [NombreArticulo], [DescripcionArticulo], [PrecioArticulo], [CantidadStock], [IdCategoria], [EstadoArticulo]) VALUES (34, N'Kit de herramientas', N'Kit de herramientas para bicicletas', 50, 20, 5, 1)
SET IDENTITY_INSERT [dbo].[Articulo] OFF
SET IDENTITY_INSERT [dbo].[Categoria] ON 

INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (1, N'Ruedas')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (2, N'Frenos')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (3, N'Pedales')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (4, N'Asientos')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (5, N'Manillares')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (6, N'Luces')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (7, N'Cascos')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (8, N'Cadenas')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (9, N'Cámaras')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (10, N'Llantas')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (11, N'Cubiertas')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (12, N'Bicicletas')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (13, N'Accesorios')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (14, N'Herramientas')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (15, N'Repuestos')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (16, N'Vestimenta')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (17, N'Protecciones')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (18, N'Otros')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (19, N'Componentes')
INSERT [dbo].[Categoria] ([IdCategoria], [NombreCategoria]) VALUES (20, N'Neumáticos')
SET IDENTITY_INSERT [dbo].[Categoria] OFF
SET IDENTITY_INSERT [dbo].[Pantalla] ON 

INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (11, N'dashboard', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (12, N'gestionusuarios', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (13, N'gestionarticulos', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (14, N'gestionmovimientos', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (15, N'verdetallesarticulo', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (16, N'alertasstockmínimo', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (17, N'informeinventario', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (18, N'exportacioninventario', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (19, N'cambiocontrasena', N'')
INSERT [dbo].[Pantalla] ([IdPantalla], [NombrePantalla], [DescripcionPantalla]) VALUES (20, N'recuperacioncontrasena', N'')
SET IDENTITY_INSERT [dbo].[Pantalla] OFF
SET IDENTITY_INSERT [dbo].[Usuario] ON 

INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (1, N'admin', N'admin@inventarioweb.com', N'123456', 1)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (2, N'jose', N'jose@gmail.com', N'qwerty', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (3, N'ana', N'ana@hotmail.com', N'securepass', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (4, N'juan', N'juan@yahoo.com', N'password123', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (5, N'maria', N'maria@gmail.com', N'secret123', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (6, N'carlos', N'carlos@hotmail.com', N'password456', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (7, N'laura', N'laura@gmail.com', N'1234', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (8, N'jorge', N'jorge@yahoo.com', N'987654', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (9, N'diana', N'diana@hotmail.com', N'pass1234', 0)
INSERT [dbo].[Usuario] ([IdUsuario], [NombreUsuario], [CorreoElectronico], [Contrasena], [EsAdmin]) VALUES (10, N'pedro', N'pedro@gmail.com', N'peterpass', 0)
SET IDENTITY_INSERT [dbo].[Usuario] OFF
SET IDENTITY_INSERT [dbo].[UsuarioPantalla] ON 

INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (1, 1, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (2, 1, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (3, 1, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (4, 1, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (5, 1, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (6, 1, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (7, 1, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (8, 1, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (9, 1, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (10, 1, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (11, 2, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (12, 2, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (13, 2, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (14, 2, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (15, 2, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (16, 2, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (17, 2, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (18, 2, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (19, 2, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (20, 2, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (21, 3, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (22, 3, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (23, 3, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (24, 3, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (25, 3, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (26, 3, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (27, 3, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (28, 3, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (29, 3, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (30, 3, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (31, 4, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (32, 4, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (33, 4, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (34, 4, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (35, 4, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (36, 4, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (37, 4, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (38, 4, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (39, 4, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (40, 4, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (41, 5, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (42, 5, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (43, 5, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (44, 5, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (45, 5, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (46, 5, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (47, 5, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (48, 5, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (49, 5, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (50, 5, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (51, 6, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (52, 6, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (53, 6, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (54, 6, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (55, 6, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (56, 6, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (57, 6, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (58, 7, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (59, 7, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (60, 7, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (61, 7, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (62, 7, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (63, 7, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (64, 7, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (65, 7, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (66, 8, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (67, 8, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (68, 8, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (69, 8, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (70, 8, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (71, 8, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (72, 8, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (73, 9, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (74, 9, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (75, 9, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (76, 9, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (77, 9, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (78, 9, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (79, 9, 20)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (80, 10, 11)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (81, 10, 12)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (82, 10, 13)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (83, 10, 14)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (84, 10, 15)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (85, 10, 16)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (86, 10, 17)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (87, 10, 18)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (88, 10, 19)
INSERT [dbo].[UsuarioPantalla] ([IdUsuarioPantalla], [IdUsuario], [IdPantalla]) VALUES (89, 10, 20)
SET IDENTITY_INSERT [dbo].[UsuarioPantalla] OFF
ALTER TABLE [dbo].[AlertaStock]  WITH CHECK ADD  CONSTRAINT [FK_AlertaStock_Articulo] FOREIGN KEY([IdArticulo])
REFERENCES [dbo].[Articulo] ([IdArticulo])
GO
ALTER TABLE [dbo].[AlertaStock] CHECK CONSTRAINT [FK_AlertaStock_Articulo]
GO
ALTER TABLE [dbo].[Articulo]  WITH CHECK ADD  CONSTRAINT [FK_Articulo_Categoria] FOREIGN KEY([IdCategoria])
REFERENCES [dbo].[Categoria] ([IdCategoria])
GO
ALTER TABLE [dbo].[Articulo] CHECK CONSTRAINT [FK_Articulo_Categoria]
GO
ALTER TABLE [dbo].[EntradaArticulo]  WITH CHECK ADD  CONSTRAINT [FK_EntradaArticulo_Articulo] FOREIGN KEY([IdArticulo])
REFERENCES [dbo].[Articulo] ([IdArticulo])
GO
ALTER TABLE [dbo].[EntradaArticulo] CHECK CONSTRAINT [FK_EntradaArticulo_Articulo]
GO
ALTER TABLE [dbo].[SalidaArticulo]  WITH CHECK ADD  CONSTRAINT [FK_SalidaArticulo_Articulo] FOREIGN KEY([IdArticulo])
REFERENCES [dbo].[Articulo] ([IdArticulo])
GO
ALTER TABLE [dbo].[SalidaArticulo] CHECK CONSTRAINT [FK_SalidaArticulo_Articulo]
GO
ALTER TABLE [dbo].[UsuarioPantalla]  WITH CHECK ADD FOREIGN KEY([IdPantalla])
REFERENCES [dbo].[Pantalla] ([IdPantalla])
GO
ALTER TABLE [dbo].[UsuarioPantalla]  WITH CHECK ADD FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[UsuarioPantalla]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioPantalla_Pantalla] FOREIGN KEY([IdPantalla])
REFERENCES [dbo].[Pantalla] ([IdPantalla])
GO
ALTER TABLE [dbo].[UsuarioPantalla] CHECK CONSTRAINT [FK_UsuarioPantalla_Pantalla]
GO
ALTER TABLE [dbo].[UsuarioPantalla]  WITH CHECK ADD  CONSTRAINT [FK_UsuarioPantalla_Usuario] FOREIGN KEY([IdUsuario])
REFERENCES [dbo].[Usuario] ([IdUsuario])
GO
ALTER TABLE [dbo].[UsuarioPantalla] CHECK CONSTRAINT [FK_UsuarioPantalla_Usuario]
GO
USE [master]
GO
ALTER DATABASE [inventario] SET  READ_WRITE 
GO
