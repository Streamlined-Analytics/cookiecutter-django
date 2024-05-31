from datetime import datetime

from rest_framework import serializers

class BaseSerializer(serializers.ModelSerializer):
    DT_RowId = serializers.SerializerMethodField()
    DT_RowAttr = serializers.SerializerMethodField()

    @staticmethod
    def get_DT_RowId(obj):  # noqa: N802
        return obj.pk

    @staticmethod
    def get_DT_RowAttr(obj):  # noqa: N802
        return {"data-pk": obj.pk}
