# Create your models here.
from django.contrib.auth.models import User
from django.db import models
from django.utils.text import slugify


class Category(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    cover = models.ImageField(upload_to='uploads/images/categories', null=True, verbose_name="Обложка")
    slug = models.SlugField(max_length=200, unique=True, null=True, verbose_name="URL-псевдоним")

    class Meta:
        ordering = ['title']
        verbose_name = "Категория"
        verbose_name_plural = "Категории"

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = self.slug or slugify(self.title)
        super().save(*args, **kwargs)


class Item(models.Model):
    title = models.CharField(max_length=255, verbose_name="Название")
    description = models.TextField(verbose_name="Описание")
    image = models.ImageField(upload_to='uploads/images/items', null=True, verbose_name="Изображение")
    average_price = models.DecimalField(max_digits=6, decimal_places=2, null=True, verbose_name="Средняя цена")
    slug = models.SlugField(max_length=200, unique=True, null=True, verbose_name="URL-псевдоним")

    class Meta:
        ordering = ['title']
        verbose_name = "Инвентарь"
        verbose_name_plural = "Инвентарь"


    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = self.slug or slugify(self.title)
        super().save(*args, **kwargs)


class Suggestion(models.Model):
    title = models.CharField(max_length=250, verbose_name="Заголовок")
    description = models.TextField(verbose_name="Описание")
    body = models.TextField(default='', verbose_name="Текст")
    cover = models.ImageField(upload_to='uploads/images/suggestions', null=True, verbose_name="Обложка")
    pub_date = models.DateTimeField('Дата публикации', auto_now_add=True)
    # on_delete=models.CASCADE,
    author = models.ForeignKey(User, related_name='suggestions', null=True, on_delete=models.SET_NULL,
                               verbose_name="Автор")
    categories = models.ManyToManyField(Category, verbose_name="Категории", related_name="suggestion_category")
    toys = models.ManyToManyField(Item, verbose_name="Требуемый инвентарь", related_name="suggestion_toys")
    slug = models.SlugField(max_length=200, unique=True, null=True, verbose_name="URL-псевдоним")

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.slug = self.slug or slugify(self.title)
        super().save(*args, **kwargs)
