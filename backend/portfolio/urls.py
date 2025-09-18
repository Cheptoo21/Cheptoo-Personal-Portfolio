"""
URL configuration for portfolio app.

This module defines the URL patterns for portfolio API endpoints
using Django REST Framework routers.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    SkillViewSet, ProjectViewSet, ExperienceViewSet,
    EducationViewSet, ContactViewSet, AboutViewSet,
    PortfolioSummaryViewSet
)

# Create router and register viewsets
router = DefaultRouter()
router.register(r'skills', SkillViewSet)
router.register(r'projects', ProjectViewSet)
router.register(r'experience', ExperienceViewSet)
router.register(r'education', EducationViewSet)
router.register(r'contact', ContactViewSet)
router.register(r'about', AboutViewSet)
router.register(r'summary', PortfolioSummaryViewSet, basename='summary')

app_name = 'portfolio'

urlpatterns = [
    # Include router URLs
    path('api/', include(router.urls)),
]
