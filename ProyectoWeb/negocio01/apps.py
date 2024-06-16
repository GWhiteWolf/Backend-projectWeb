from django.apps import AppConfig


class Negocio01Config(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'negocio01'

    def ready(self):
        import negocio01.signals
