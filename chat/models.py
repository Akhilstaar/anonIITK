from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class UserAccount(models.Model):
    user = models.ForeignKey(User, default=None, on_delete=models.CASCADE)


class Message(models.Model):
    Message_id = models.PositiveIntegerField()
    content = models.CharField(max_length=1000)
    date = models.DateTimeField(default=datetime.now)
    user = models.CharField(default='Anonymous', max_length=255)

    def save(self, *args, **kwargs):
        if not self.id:
            latest_id = Message.objects.aggregate(models.Max('Message_id'))['Message_id__max']
            self.Message_id = 1 if not latest_id else latest_id + 1
        super(Message, self).save(*args, **kwargs)