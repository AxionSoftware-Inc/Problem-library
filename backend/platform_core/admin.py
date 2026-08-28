from django.contrib import admin

from .models import ActivityEvent, Artifact, ObjectReference, ObjectRevision, Project, ScientificObject

admin.site.register(Project)
admin.site.register(ScientificObject)
admin.site.register(ObjectRevision)
admin.site.register(ObjectReference)
admin.site.register(Artifact)
admin.site.register(ActivityEvent)
