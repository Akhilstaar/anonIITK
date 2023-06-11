from django.urls import path
from .views import RegisterView, ListChatView, LogoutView, AddChatMessageView
from rest_framework_simplejwt.views import TokenObtainPairView

urlpatterns = [
    path('register', RegisterView.as_view(), name='register'),
    path('m3ssage', AddChatMessageView.as_view(), name='message'),
    path('chats', ListChatView.as_view(), name='chat'),
    path('login', TokenObtainPairView.as_view(), name='login'),
    # path('data', DataView.as_view(), name='data'),
    path('logout', LogoutView.as_view(), name='Logout'),
]