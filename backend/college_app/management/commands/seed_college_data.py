from django.core.management.base import BaseCommand
from college_app.seed_data import seed_all_data

class Command(BaseCommand):
    help = 'Seeds SKASC imaginary college data to feed the LLM and database'

    def handle(self, *args, **options):
        seed_all_data()
        self.stdout.write(self.style.SUCCESS('Successfully seeded college data!'))
