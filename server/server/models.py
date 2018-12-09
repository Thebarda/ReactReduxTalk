from django.db import models
from django.utils import timezone
import uuid


class Todo(models.Model):
    id = models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True)
    todo = models.CharField(max_length=100, editable=True)
    is_completed = models.BooleanField()
    created_at = models.DateTimeField(default=timezone.now)
