"""
Django REST Framework views for portfolio API endpoints.

This module contains API views for handling portfolio data including
CRUD operations and custom endpoints for portfolio summary.
"""

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from django.db.models import Q
from .models import Skill, Project, Experience, Education, Contact, About
from .serializers import (
    SkillSerializer, ProjectSerializer, ExperienceSerializer,
    EducationSerializer, ContactSerializer, AboutSerializer,
    PortfolioSummarySerializer
)


class SkillViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing skills.
    
    Provides CRUD operations for skills with filtering by category
    and featured status.
    """
    
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter skills based on query parameters."""
        queryset = Skill.objects.all()
        category = self.request.query_params.get('category', None)
        featured = self.request.query_params.get('featured', None)
        
        if category:
            queryset = queryset.filter(category=category)
        
        if featured is not None:
            featured_bool = featured.lower() == 'true'
            queryset = queryset.filter(is_featured=featured_bool)
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def categories(self, request):
        """Get list of available skill categories."""
        categories = [{'value': choice[0], 'label': choice[1]} 
                     for choice in Skill.CATEGORY_CHOICES]
        return Response(categories)


class ProjectViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing projects.
    
    Provides CRUD operations for projects with filtering by
    featured status, published status, and technology search.
    """
    
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter projects based on query parameters."""
        queryset = Project.objects.all()
        featured = self.request.query_params.get('featured', None)
        published = self.request.query_params.get('published', None)
        technology = self.request.query_params.get('technology', None)
        
        if featured is not None:
            featured_bool = featured.lower() == 'true'
            queryset = queryset.filter(is_featured=featured_bool)
        
        if published is not None:
            published_bool = published.lower() == 'true'
            queryset = queryset.filter(is_published=published_bool)
        
        if technology:
            queryset = queryset.filter(
                Q(technologies__icontains=technology) |
                Q(title__icontains=technology) |
                Q(description__icontains=technology)
            )
        
        return queryset
    
    @action(detail=False, methods=['get'])
    def technologies(self, request):
        """Get list of all technologies used in projects."""
        projects = Project.objects.filter(is_published=True)
        technologies = set()
        
        for project in projects:
            if project.technologies:
                tech_list = [tech.strip() for tech in project.technologies.split(',')]
                technologies.update(tech_list)
        
        return Response(sorted(list(technologies)))


class ExperienceViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing work experience.
    
    Provides CRUD operations for experience with filtering
    by current status and date range.
    """
    
    queryset = Experience.objects.all()
    serializer_class = ExperienceSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter experience based on query parameters."""
        queryset = Experience.objects.all()
        current = self.request.query_params.get('current', None)
        
        if current is not None:
            current_bool = current.lower() == 'true'
            queryset = queryset.filter(is_current=current_bool)
        
        return queryset


class EducationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing education.
    
    Provides CRUD operations for education with filtering
    by current status.
    """
    
    queryset = Education.objects.all()
    serializer_class = EducationSerializer
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        """Filter education based on query parameters."""
        queryset = Education.objects.all()
        current = self.request.query_params.get('current', None)
        
        if current is not None:
            current_bool = current.lower() == 'true'
            queryset = queryset.filter(is_current=current_bool)
        
        return queryset


class ContactViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing contact information.
    
    Provides CRUD operations for contact data.
    """
    
    queryset = Contact.objects.all()
    serializer_class = ContactSerializer
    permission_classes = [AllowAny]


class AboutViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing about information.
    
    Provides CRUD operations for personal information and bio.
    """
    
    queryset = About.objects.all()
    serializer_class = AboutSerializer
    permission_classes = [AllowAny]


class PortfolioSummaryViewSet(viewsets.ViewSet):
    """
    ViewSet for portfolio summary data.
    
    Provides a comprehensive overview of all portfolio data
    in a single endpoint.
    """
    
    permission_classes = [AllowAny]
    
    def list(self, request):
        """
        Get portfolio summary data.
        
        Returns combined data from all portfolio models
        for the main portfolio page.
        """
        try:
            # Get the most recent about and contact information
            about = About.objects.first()
            contact = Contact.objects.first()
            
            # Get featured skills (limit to 8)
            featured_skills = Skill.objects.filter(is_featured=True)[:8]
            
            # Get featured projects (limit to 6)
            featured_projects = Project.objects.filter(
                is_featured=True, 
                is_published=True
            )[:6]
            
            # Get recent experience (limit to 3)
            recent_experience = Experience.objects.all()[:3]
            
            # Get all education
            education = Education.objects.all()
            
            # Prepare summary data
            summary_data = {
                'about': about,
                'contact': contact,
                'featured_skills': featured_skills,
                'featured_projects': featured_projects,
                'recent_experience': recent_experience,
                'education': education
            }
            
            serializer = PortfolioSummarySerializer(summary_data)
            return Response(serializer.data)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to retrieve portfolio summary: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def stats(self, request):
        """
        Get portfolio statistics.
        
        Returns counts and metrics for portfolio data.
        """
        try:
            stats = {
                'total_projects': Project.objects.filter(is_published=True).count(),
                'featured_projects': Project.objects.filter(
                    is_featured=True, 
                    is_published=True
                ).count(),
                'total_skills': Skill.objects.count(),
                'featured_skills': Skill.objects.filter(is_featured=True).count(),
                'total_experience': Experience.objects.count(),
                'current_experience': Experience.objects.filter(is_current=True).count(),
                'total_education': Education.objects.count(),
                'current_education': Education.objects.filter(is_current=True).count(),
            }
            
            return Response(stats)
            
        except Exception as e:
            return Response(
                {'error': f'Failed to retrieve portfolio stats: {str(e)}'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )