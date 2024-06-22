from rest_framework import permissions
from rest_framework_datatables_editor.filters import DatatablesFilterBackend
from rest_framework_datatables_editor.viewsets import DatatablesEditorModelViewSet
from django_filters.rest_framework import DjangoFilterBackend
# from .filters import BaseFilter  # noqa: ERA001
# from .serializers import BaseSerializer  # noqa: ERA001

class BaseViewSet(DatatablesEditorModelViewSet):
    # queryset = Model.objects.all()  # noqa: ERA001
    # serializer_class = BaseSerializer  # noqa: ERA001
    permission_classes = [permissions.IsAuthenticated]
    # need DjangoFilterBackend for custom filters and  # noqa: ERA001
    # DatatablesFilterBackend for datatables global search filtering  # noqa: ERA001
    filter_backends = [DjangoFilterBackend, DatatablesFilterBackend]
    # filterset_class = BaseFilter  # noqa: ERA001


