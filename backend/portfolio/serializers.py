"""
Django REST Framework serializers for portfolio API endpoints.

This module contains serializers for converting Django model instances
to JSON format and handling API request/response data validation.
"""

from rest_framework import serializers
from .models import Skill, Project, Experience, Education, Contact, About


class SkillSerializer(serializers.ModelSerializer):
    """
    Serializer for Skill model.
    
    Provides serialization for skill data including validation
    and custom field representations.
    """
    
    category_display = serializers.CharField(source='get_category_display', read_only=True)
    
    class Meta:
        model = Skill
        fields = [
            'id', 'name', 'category', 'category_display', 
            'proficiency_level', 'years_experience', 'is_featured',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_proficiency_level(self, value):
        """Validate proficiency level is between 1 and 5."""
        if not 1 <= value <= 5:
            raise serializers.ValidationError("Proficiency level must be between 1 and 5.")
        return value
    
    def validate_years_experience(self, value):
        """Validate years of experience is non-negative."""
        if value < 0:
            raise serializers.ValidationError("Years of experience cannot be negative.")
        return value


class ProjectSerializer(serializers.ModelSerializer):
    """
    Serializer for Project model.
    
    Provides serialization for project data including computed
    duration field and technology list processing.
    """
    
    duration = serializers.ReadOnlyField()
    technologies_list = serializers.SerializerMethodField()
    
    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'short_description',
            'technologies', 'technologies_list', 'github_url', 'live_url',
            'image', 'is_featured', 'is_published', 'start_date',
            'end_date', 'duration', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'duration', 'created_at', 'updated_at']
    
    def get_technologies_list(self, obj):
        """Convert comma-separated technologies string to list."""
        if obj.technologies:
            return [tech.strip() for tech in obj.technologies.split(',')]
        return []
    
    def validate(self, data):
        """Validate project data consistency."""
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError("End date cannot be before start date.")
        
        return data


class ExperienceSerializer(serializers.ModelSerializer):
    """
    Serializer for Experience model.
    
    Provides serialization for work experience data with
    validation for date consistency.
    """
    
    class Meta:
        model = Experience
        fields = [
            'id', 'company', 'position', 'description',
            'start_date', 'end_date', 'is_current', 'location',
            'company_url', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate(self, data):
        """Validate experience data consistency."""
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        is_current = data.get('is_current', False)
        
        if is_current and end_date:
            raise serializers.ValidationError("Current position cannot have an end date.")
        
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError("End date cannot be before start date.")
        
        return data


class EducationSerializer(serializers.ModelSerializer):
    """
    Serializer for Education model.
    
    Provides serialization for educational background data
    with GPA validation.
    """
    
    class Meta:
        model = Education
        fields = [
            'id', 'institution', 'degree', 'field_of_study',
            'start_date', 'end_date', 'is_current', 'gpa',
            'location', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def validate_gpa(self, value):
        """Validate GPA is between 0.0 and 4.0."""
        if value is not None and not 0.0 <= value <= 4.0:
            raise serializers.ValidationError("GPA must be between 0.0 and 4.0.")
        return value
    
    def validate(self, data):
        """Validate education data consistency."""
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        is_current = data.get('is_current', False)
        
        if is_current and end_date:
            raise serializers.ValidationError("Current education cannot have an end date.")
        
        if end_date and start_date and end_date < start_date:
            raise serializers.ValidationError("End date cannot be before start date.")
        
        return data


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for Contact model.
    
    Provides serialization for contact information and
    social media links.
    """
    
    class Meta:
        model = Contact
        fields = [
            'id', 'email', 'phone', 'location',
            'linkedin_url', 'github_url', 'twitter_url',
            'website_url', 'resume_url', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class AboutSerializer(serializers.ModelSerializer):
    """
    Serializer for About model.
    
    Provides serialization for personal information and bio.
    """
    
    class Meta:
        model = About
        fields = [
            'id', 'name', 'title', 'bio',
            'profile_image', 'resume_file', 'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class PortfolioSummarySerializer(serializers.Serializer):
    """
    Serializer for portfolio summary data.
    
    Combines data from multiple models to provide
    a comprehensive portfolio overview.
    """
    
    about = AboutSerializer()
    contact = ContactSerializer()
    featured_skills = SkillSerializer(many=True)
    featured_projects = ProjectSerializer(many=True)
    recent_experience = ExperienceSerializer(many=True)
    education = EducationSerializer(many=True)
    
    class Meta:
        fields = [
            'about', 'contact', 'featured_skills',
            'featured_projects', 'recent_experience', 'education'
        ]
