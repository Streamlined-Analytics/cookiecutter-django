import contextlib

from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "{{ cookiecutter.project_slug }}.core"
    verbose_name = _("Core")

    def ready(self):
        with contextlib.suppress(ImportError):
            import {{ cookiecutter.project_slug }}.core.signals  # noqa: F401
