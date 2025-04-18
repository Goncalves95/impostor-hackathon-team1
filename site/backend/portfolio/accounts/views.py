from django.contrib.auth import authenticate
from rest_framework import status, permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializers import UserSerializer, RegisterSerializer, ProfileSerializer

class LoginView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        user = authenticate(username=username, password=password)
        
        if user:
            token, _ = Token.objects.get_or_create(user=user)
            return Response({
                'token': token.key,
                'user': UserSerializer(user).data
            })
        return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

class RegisterView(APIView):
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LogoutView(APIView):
    def post(self, request):
        # Delete the token to logout
        request.user.auth_token.delete()
        return Response({'message': 'Successfully logged out'}, status=status.HTTP_200_OK)

class UserDetailView(APIView):
    def get(self, request):
        # Return current user info
        serializer = UserSerializer(request.user)
        return Response(serializer.data)

class ProfileView(APIView):
    def get(self, request):
        # Return current user's profile
        serializer = ProfileSerializer(request.user.profile)
        return Response(serializer.data)
        
    def put(self, request):
        # Update profile
        serializer = ProfileSerializer(request.user.profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)