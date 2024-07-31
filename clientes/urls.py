from django.urls import path
from . import views

urlpatterns = [
    path('', views.clientes, name="clientes"),
    path('atualiza_cliente/', views.att_cliente, name="atualiza_cliente"),
    path('excluir_pet/<int:id>', views.excluir_pet, name="excluir_pet"),
    path('update_pet/<int:id>', views.update_pet, name="update_pet"),
    path('update_cliente/<int:id>', views.update_cliente, name="update_cliente")
]