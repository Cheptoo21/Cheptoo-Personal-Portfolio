"""
Portfolio models for storing personal portfolio data.

This module contains Django models for managing portfolio information including
projects, skills, experience, education, and contact details.
"""

from django.db import models
from django.core.validators import URLValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone


class Skill(models.Model):
    """
    Model representing a technical skill or competency.
    
    Attributes:
        name (str): The name of the skill (e.g., 'Python', 'React', 'Django')
        category (str): The category of skill (e.g., 'Programming', 'Framework', 'Tool')
        proficiency_level (int): Proficiency level from 1-5 (1=Beginner, 5=Expert)
        years_experience (float): Number of years of experience with this skill
        is_featured (bool): Whether to display prominently on the portfolio
        created_at (datetime): When the skill was added
        updated_at (datetime): When the skill was last modified
    """
    
    CATEGORY_CHOICES = [
        ('programming', 'Programming Language'),
        ('framework', 'Framework/Library'),
        ('database', 'Database'),
        ('tool', 'Development Tool'),
        ('cloud', 'Cloud Platform'),
        ('design', 'Design Tool'),
        ('other', 'Other'),
    ]
    
    name = models.CharField(max_length=100, unique=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='other')
    proficiency_level = models.IntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)],
        help_text="Proficiency level from 1 (Beginner) to 5 (Expert)"
    )
    years_experience = models.FloatField(
        validators=[MinValueValidator(0)],
        help_text="Years of experience with this skill"
    )
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-proficiency_level', 'name']
        verbose_name = 'Skill'
        verbose_name_plural = 'Skills'
    
    def __str__(self):
        return f"{self.name} ({self.get_category_display()})"


class Project(models.Model):
    """
    Model representing a portfolio project.
    
    Attributes:
        title (str): Project title
        description (str): Detailed project description
        short_description (str): Brief summary for cards
        technologies (str): Comma-separated list of technologies used
        github_url (str): GitHub repository URL
        live_url (str): Live demo URL
        image (ImageField): Project screenshot
        is_featured (bool): Whether to display prominently
        is_published (bool): Whether to show on public portfolio
        start_date (date): Project start date
        end_date (date): Project completion date (null if ongoing)
        created_at (datetime): When the project was added
        updated_at (datetime): When the project was last modified
    """
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    technologies = models.CharField(max_length=500, help_text="Comma-separated list of technologies")
    github_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    live_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    image = models.ImageField(upload_to='projects/', blank=True, null=True)
    is_featured = models.BooleanField(default=False)
    is_published = models.BooleanField(default=True)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_featured', '-start_date']
        verbose_name = 'Project'
        verbose_name_plural = 'Projects'
    
    def __str__(self):
        return self.title
    
    @property
    def duration(self):
        """Calculate project duration in months."""
        if self.end_date:
            delta = self.end_date - self.start_date
            return round(delta.days / 30, 1)
        else:
            delta = timezone.now().date() - self.start_date
            return round(delta.days / 30, 1)


class Experience(models.Model):
    """
    Model representing work experience or employment history.
    
    Attributes:
        company (str): Company or organization name
        position (str): Job title or position
        description (str): Detailed job description and responsibilities
        start_date (date): Employment start date
        end_date (date): Employment end date (null if current)
        is_current (bool): Whether this is the current position
        location (str): Work location (city, state/country)
        company_url (str): Company website URL
        created_at (datetime): When the experience was added
        updated_at (datetime): When the experience was last modified
    """
    
    company = models.CharField(max_length=200)
    position = models.CharField(max_length=200)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    location = models.CharField(max_length=200)
    company_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_current', '-start_date']
        verbose_name = 'Experience'
        verbose_name_plural = 'Experiences'
    
    def __str__(self):
        return f"{self.position} at {self.company}"


class Education(models.Model):
    """
    Model representing educational background.
    
    Attributes:
        institution (str): Educational institution name
        degree (str): Degree or certification name
        field_of_study (str): Field of study or major
        start_date (date): Education start date
        end_date (date): Education end date (null if ongoing)
        is_current (bool): Whether currently enrolled
        gpa (float): Grade point average (optional)
        location (str): Institution location
        created_at (datetime): When the education was added
        updated_at (datetime): When the education was last modified
    """
    
    institution = models.CharField(max_length=200)
    degree = models.CharField(max_length=200)
    field_of_study = models.CharField(max_length=200)
    start_date = models.DateField()
    end_date = models.DateField(blank=True, null=True)
    is_current = models.BooleanField(default=False)
    gpa = models.FloatField(
        blank=True, 
        null=True,
        validators=[MinValueValidator(0.0), MaxValueValidator(4.0)],
        help_text="GPA on a 4.0 scale"
    )
    location = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-is_current', '-end_date']
        verbose_name = 'Education'
        verbose_name_plural = 'Education'
    
    def __str__(self):
        return f"{self.degree} in {self.field_of_study} from {self.institution}"


class Contact(models.Model):
    """
    Model representing contact information and social links.
    
    Attributes:
        email (str): Primary email address
        phone (str): Phone number
        location (str): Current location
        linkedin_url (str): LinkedIn profile URL
        github_url (str): GitHub profile URL
        twitter_url (str): Twitter profile URL
        website_url (str): Personal website URL
        resume_url (str): Resume/CV download URL
        created_at (datetime): When the contact info was added
        updated_at (datetime): When the contact info was last modified
    """
    
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True)
    location = models.CharField(max_length=200)
    linkedin_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    github_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    twitter_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    website_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    resume_url = models.URLField(blank=True, null=True, validators=[URLValidator()])
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Contact Information'
        verbose_name_plural = 'Contact Information'
    
    def __str__(self):
        return f"Contact: {self.email}"


class About(models.Model):
    """
    Model representing personal information and bio.
    
    Attributes:
        name (str): Full name
        title (str): Professional title or tagline
        bio (str): Personal biography and introduction
        profile_image (ImageField): Profile picture
        resume_file (FileField): Resume/CV file
        created_at (datetime): When the about info was added
        updated_at (datetime): When the about info was last modified
    """
    
    name = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    bio = models.TextField()
    profile_image = models.ImageField(upload_to='profile/', blank=True, null=True)
    resume_file = models.FileField(upload_to='resume/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'About Information'
        verbose_name_plural = 'About Information'
    
    def __str__(self):
        return f"About: {self.name}"