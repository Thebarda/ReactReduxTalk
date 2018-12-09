from rest_framework import serializers
from server.models import Todo


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = ('id', 'todo', 'is_completed')
