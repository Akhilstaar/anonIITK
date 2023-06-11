from rest_framework import permissions, status, serializers
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.exceptions import ValidationError

from django.db import transaction
from .models import UserAccount, Message
from django.contrib.auth.models import User

from rest_framework.throttling import AnonRateThrottle
from rest_framework.decorators import throttle_classes


class LogoutView(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request, format=None):
        try:
            refresh_token = request.data["refresh"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"success": "User logged out successfully"})
        except Exception as e:
            return Response({"error": str(e)}, status=400)


class ListChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ('Message_id', 'content', 'date', 'user')


class ListChatView(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        try:
            with transaction.atomic():
                chats = Message.objects.order_by('-Message_id')
                if len(chats) > 3000:
                    delete_count = len(chats) - 100
                    Message.objects.filter(
                        Message_id__in=chats[:delete_count]).delete()

                chats = chats[:100]
                serializer = ListChatSerializer(chats, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {'error': f'Something went wrong when trying to fetch data: {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class MessageSerializer(serializers.Serializer):
    content = serializers.CharField(max_length=1000)


@throttle_classes([AnonRateThrottle])
class AddChatMessageView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            key = request.data.get('key')

            if key != '13515':
                return Response(
                    {'success': 'Use command nc xx.xxx.xx.xxx xxxx in terminal to connect to the vulnerable port of the server'},
                    status=status.HTTP_201_CREATED
                )

            else:
                serializer = MessageSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                chat_data = serializer.validated_data

                with transaction.atomic():
                    pred = Message(**chat_data)
                    pred.save()
                return Response(
                    {'success': 'Posted successfully'},
                    status=status.HTTP_201_CREATED
                )

        except ValidationError as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=20)
    email = serializers.CharField(max_length=50)
    password = serializers.CharField(max_length=50)
    cpassword = serializers.CharField(max_length=50)


class RegisterView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        try:
            serializer = RegisterSerializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            prediction_data = serializer.validated_data

            username = prediction_data['username']
            email = prediction_data['email']
            password = prediction_data['password']
            cpassword = prediction_data['cpassword']

            if password == cpassword:
                if len(password) >= 8:
                    if not User.objects.filter(username=username).exists():
                        if not User.objects.filter(email=email).exists():
                            new_user = User.objects.create_user(
                                username=username,
                                email=email,
                                password=password,
                            )
                            user_initials = UserAccount(user=new_user)
                            user_initials.save()
                            new_user.save()

                            if User.objects.filter(username=username).exists():
                                return Response(
                                    {'success': 'Account created successfully'},
                                    status=status.HTTP_201_CREATED
                                )
                            else:
                                return Response(
                                    {'error': 'Something went wrong when trying to create account'},
                                    status=status.HTTP_500_INTERNAL_SERVER_ERROR
                                )
                        else:
                            return Response(
                                {'error': 'Email already exists'},
                                status=status.HTTP_400_BAD_REQUEST
                            )
                    else:
                        return Response(
                            {'error': 'Username already exists'},
                            status=status.HTTP_400_BAD_REQUEST
                        )
                else:
                    return Response(
                        {'error': 'Password must be at least 8 characters in length'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(
                    {'error': 'Passwords do not match'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except Exception as e:
            return Response(
                {'error': f'Something went wrong when trying to register account: {e}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
