from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from djongo import models

# MODELE TESTOWE (proste, bez migracji, tylko do populacji testowej)
from django.db import connection

class Command(BaseCommand):
    help = 'Populate the octofit_db database with test data'

    def handle(self, *args, **options):
        User = get_user_model()
        # Usuń istniejące dane
        User.objects.all().delete()
        self.stdout.write(self.style.SUCCESS('Usunięto wszystkich użytkowników.'))

        # Dodaj użytkowników
        marvel_team = 'marvel'
        dc_team = 'dc'
        users = [
            User(username='ironman', email='ironman@marvel.com', first_name='Tony', last_name='Stark'),
            User(username='spiderman', email='spiderman@marvel.com', first_name='Peter', last_name='Parker'),
            User(username='batman', email='batman@dc.com', first_name='Bruce', last_name='Wayne'),
            User(username='superman', email='superman@dc.com', first_name='Clark', last_name='Kent'),
        ]
        for user in users:
            user.save()
        self.stdout.write(self.style.SUCCESS('Dodano przykładowych użytkowników.'))

        # Tworzenie kolekcji teams, activities, leaderboard, workouts
        db = connection.cursor().db_conn
        db.teams.delete_many({})
        db.activities.delete_many({})
        db.leaderboard.delete_many({})
        db.workouts.delete_many({})

        db.teams.insert_many([
            {'name': marvel_team, 'members': ['ironman', 'spiderman']},
            {'name': dc_team, 'members': ['batman', 'superman']},
        ])
        db.activities.insert_many([
            {'user': 'ironman', 'activity': 'run', 'distance': 5},
            {'user': 'spiderman', 'activity': 'cycle', 'distance': 10},
            {'user': 'batman', 'activity': 'swim', 'distance': 2},
            {'user': 'superman', 'activity': 'fly', 'distance': 100},
        ])
        db.leaderboard.insert_many([
            {'team': marvel_team, 'points': 15},
            {'team': dc_team, 'points': 102},
        ])
        db.workouts.insert_many([
            {'user': 'ironman', 'workout': 'pushups', 'reps': 50},
            {'user': 'spiderman', 'workout': 'pullups', 'reps': 20},
            {'user': 'batman', 'workout': 'situps', 'reps': 100},
            {'user': 'superman', 'workout': 'squats', 'reps': 200},
        ])
        # Unikalny indeks na email
        db.users.create_index([('email', 1)], unique=True)
        self.stdout.write(self.style.SUCCESS('Dodano przykładowe dane do kolekcji teams, activities, leaderboard, workouts.'))
        self.stdout.write(self.style.SUCCESS('Utworzono unikalny indeks na email w kolekcji users.'))
        self.stdout.write(self.style.SUCCESS('Populacja bazy zakończona.'))
