from rest_framework import permissions
from rest_framework_datatables_editor.filters import DatatablesFilterBackend
from rest_framework_datatables_editor.viewsets import DatatablesEditorModelViewSet
# from .filters import BaseFilter
# from .serializers import BaseSerializer

class BaseViewSet(DatatablesEditorModelViewSet):
    # queryset = Model.objects.all()
    # serializer_class = BaseSerializer
    permission_classes = [permissions.IsAuthenticated]
    # need DjangoFilterBackend for custom filters and
    # DatatablesFilterBackend for datatables global search filtering
    filter_backends = [DjangoFilterBackend, DatatablesFilterBackend]
    # filterset_class = BaseFilter


