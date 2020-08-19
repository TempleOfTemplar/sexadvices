from django.contrib.auth.models import User
from django_filters import rest_framework as filters
from oauth2_provider.contrib.rest_framework import TokenHasReadWriteScope
from rest_framework import generics, permissions
from rest_framework import viewsets

from . import serializers
from .filters import SuggestionFilter
from .models import Suggestion, Category, Item


# def index(request, path=''):
#     return render(request, '../../frontend/index.html')

# class SuggestionList(APIView):
#     """
#     List all snippets, or create a new snippet.
#     """
#
#     def get(self, request, format=None):
#         suggestions = Suggestion.objects.all()
#         serializer = SuggestionSerializer(suggestions, many=True)
#         return Response(serializer.data)
#
#     def post(self, request, format=None):
#         serializer = SuggestionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SuggestionViewSet(viewsets.ModelViewSet):
    queryset = Suggestion.objects.all()
    serializer_class = serializers.SuggestionSerializer
    filter_backends = (filters.DjangoFilterBackend,)
    # filterset_fields = ('categories', 'toys')
    filterset_class = SuggestionFilter


# class SuggestionListView(generics.ListAPIView):
#     queryset = Suggestion.objects.all()
#     serializer_class = SuggestionSerializer
#     filter_backends = (filters.DjangoFilterBackend,)
#     # filterset_fields = ('categories', 'toys')
#     filterset_class = SuggestionFilter


# class SuggestionListView(viewsets.ModelViewSet):
#     queryset = Suggestion.objects.all()
#     serializer_class = SuggestionSerializer
#     filter_backends = [django_filters.rest_framework.DjangoFilterBackend]
# filterset_fields = ['title', 'categories', 'toys', 'author']


class UserList(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class UserDetails(generics.RetrieveAPIView):
    permission_classes = [permissions.IsAuthenticated, TokenHasReadWriteScope]
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = serializers.ItemSerializer
    # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)

# class SuggestionViewSet(viewsets.ModelViewSet):
#     queryset = Suggestion.objects.all()
#     serializer_class = SuggestionSerializer
#
#     # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
#
#     def perform_create(self, serializer):
#         serializer.save(author=self.request.user)
