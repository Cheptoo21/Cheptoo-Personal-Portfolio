"""
Django admin configuration for portfolio models.

This module provides admin interface customization for managing
portfolio data through Django's admin panel.
"""

from django.contrib import admin
from .models import Skill, Project, Experience, Education, Contact, About


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    """
    Admin configuration for Skill model.
    
    Provides a user-friendly interface for managing skills with
    filtering, search, and list display options.
    """
    
    list_display = ['name', 'category', 'proficiency_level', 'years_experience', 'is_featured', 'created_at']
    list_filter = ['category', 'is_featured', 'proficiency_level', 'created_at']
    search_fields = ['name', 'category']
    list_editable = ['is_featured', 'proficiency_level']
    ordering = ['-proficiency_level', 'name']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('name', 'category', 'is_featured')
        }),
        ('Proficiency', {
            'fields': ('proficiency_level', 'years_experience')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    """
    Admin configuration for Project model.
    
    Provides comprehensive project management with image preview
    and filtering capabilities.
    """
    
    list_display = ['title', 'is_featured', 'is_published', 'start_date', 'end_date', 'created_at']
    list_filter = ['is_featured', 'is_published', 'start_date', 'created_at']
    search_fields = ['title', 'description', 'technologies']
    list_editable = ['is_featured', 'is_published']
    ordering = ['-is_featured', '-start_date']
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'short_description', 'description')
        }),
        ('Technical Details', {
            'fields': ('technologies', 'github_url', 'live_url')
        }),
        ('Media', {
            'fields': ('image',)
        }),
        ('Status & Dates', {
            'fields': ('is_featured', 'is_published', 'start_date', 'end_date')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    """
    Admin configuration for Experience model.
    
    Provides experience management with current position highlighting
    and date filtering.
    """
    
    list_display = ['position', 'company', 'is_current', 'start_date', 'end_date', 'location']
    list_filter = ['is_current', 'start_date', 'company']
    search_fields = ['position', 'company', 'description', 'location']
    list_editable = ['is_current']
    ordering = ['-is_current', '-start_date']
    
    fieldsets = (
        ('Position Details', {
            'fields': ('position', 'company', 'description')
        }),
        ('Location & Dates', {
            'fields': ('location', 'start_date', 'end_date', 'is_current')
        }),
        ('Company Information', {
            'fields': ('company_url',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    """
    Admin configuration for Education model.
    
    Provides education management with current enrollment tracking
    and academic performance metrics.
    """
    
    list_display = ['degree', 'institution', 'field_of_study', 'is_current', 'gpa', 'location']
    list_filter = ['is_current', 'institution', 'field_of_study']
    search_fields = ['degree', 'institution', 'field_of_study', 'location']
    list_editable = ['is_current']
    ordering = ['-is_current', '-end_date']
    
    fieldsets = (
        ('Academic Information', {
            'fields': ('degree', 'institution', 'field_of_study', 'gpa')
        }),
        ('Location & Dates', {
            'fields': ('location', 'start_date', 'end_date', 'is_current')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    """
    Admin configuration for Contact model.
    
    Provides contact information management with social media
    link validation and organization.
    """
    
    list_display = ['email', 'phone', 'location', 'created_at']
    search_fields = ['email', 'phone', 'location']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Contact Information', {
            'fields': ('email', 'phone', 'location')
        }),
        ('Social Media & Links', {
            'fields': ('linkedin_url', 'github_url', 'twitter_url', 'website_url', 'resume_url')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


@admin.register(About)
class AboutAdmin(admin.ModelAdmin):
    """
    Admin configuration for About model.
    
    Provides personal information management with file upload
    capabilities for profile images and resumes.
    """
    
    list_display = ['name', 'title', 'created_at']
    search_fields = ['name', 'title', 'bio']
    ordering = ['-created_at']
    
    fieldsets = (
        ('Personal Information', {
            'fields': ('name', 'title', 'bio')
        }),
        ('Media Files', {
            'fields': ('profile_image', 'resume_file')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    readonly_fields = ['created_at', 'updated_at']


# Customize admin site header and title
admin.site.site_header = "Cheptoo Portfolio Administration"
admin.site.site_title = "Portfolio Admin"
admin.site.index_title = "Welcome to Portfolio Administration"