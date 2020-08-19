from django.contrib.auth.models import User
from rest_framework import serializers

from .models import Suggestion, Item, Category


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', "first_name", "last_name")


class SuggestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Suggestion
        fields = ('title',
                  'description',
                  'body',
                  'cover',
                  'pub_date',
                  'author',
                  'categories',
                  'toys',
                  )


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('id',
                  'title',
                  'description',
                  'image',
                  'average_price',
                  )


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('id',
                  'title',
                  'cover'
                  )

# class AuthorSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Author
#         fields = ('id',
#                   'name',
#                   'email')
