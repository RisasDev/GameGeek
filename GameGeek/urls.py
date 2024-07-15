from django.urls import path
from . import views, apis
from django.views.decorators.csrf import csrf_exempt

urlpatterns = [
    path('', views.index, name='index'),
    path('pages/despacho', views.despacho, name='despacho'),
    path('pages/register', views.register, name='register'),
    path('pages/post-register', views.post_register, name='post-register'),
    path('pages/productos/<str:categoria>', views.productos, name='productos'),
    path('pages/password-recovery', views.password_recovery, name='password-recovery'),
    path('pages/terms', views.terms, name='terms'),
    path('pages/privacy', views.privacy, name='privacy'),
    path('api/login', csrf_exempt(apis.iniciar_sesion), name='api/login'),
    path('api/register', csrf_exempt(apis.registrarse), name='api/register'),
    path('api/logout', csrf_exempt(apis.cerrar_sesion), name='api/logout'),
    path('api/account/mis-datos', csrf_exempt(apis.guardarMisDatos), name='api/account/mis-datos'),
    path('api/dashboard/productos/agregar', csrf_exempt(apis.dashboardAgregarProducto), name='api/dashboard/productos/agregar'),
    path('api/dashboard/productos/eliminar', csrf_exempt(apis.dashboardEliminarProducto), name='api/dashboard/productos/eliminar'),
    path('api/dashboard/productos/modificar', csrf_exempt(apis.dashboardModificarProducto), name='api/dashboard/productos/modificar'),
    path('api/dashboard/productos/obtener', csrf_exempt(apis.dashboardObtenerProducto), name='api/dashboard/productos/obtener'),
    path('api/dashboard/categorias/agregar', csrf_exempt(apis.dashboardAgregarCategoria), name='api/dashboard/categorias/agregar'),
    path('account/mis-datos', views.misDatos, name='account/mis-datos'),
    path('account/shop-cart', views.shop_cart, name='shop-cart'),
    path('account/orders', views.orders, name='orders'),
    path('account/pays', views.pays, name='pays'),
    path('dashboard', views.dashboard, name='dashboard'),
    path('dashboard/productos', views.dashboardProductos, name='dashboard/productos'),
    path('dashboard/categorias', views.dashboardCategorias, name='dashboard/categorias')
]