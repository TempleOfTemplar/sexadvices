import django_filters
from django_filters.fields import Lookup
from django_filters.filters import Filter
from rest_framework.serializers import ValidationError

from .models import Suggestion


class M2MFilter(Filter):

    def filter(self, qs, value):
        if not value:
            return qs

        values = value.split(',')
        for v in values:
            qs = qs.filter(labels=v)
        return qs


class ListFilter(Filter):
    def filter(self, queryset, value):
        list_values = value.split(',')
        if not all(item.isdigit() for item in list_values):
            raise ValidationError('All values in %s the are not integer' % str(list_values))
        return super(ListFilter, self).filter(queryset, Lookup(list_values, 'in'))


class InListFilter(Filter):
    """
    Expects a comma separated list
    filters values in list
    """

    def filter(self, qs, value):
        if value:
            return qs.filter(**{self.field_name + '__in': value.split(',')})
        return qs


class CharFilterInFilter(django_filters.BaseInFilter, django_filters.CharFilter):
    pass


class SuggestionFilter(django_filters.FilterSet):
    categories = CharFilterInFilter(field_name='categories__title', lookup_expr='in')
    toys = CharFilterInFilter(field_name='toys__title', lookup_expr='in')

    class Meta:
        model = Suggestion
        fields = ['categories', 'toys']
