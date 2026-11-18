import os
from django.conf import settings
from django.contrib import admin
from django.urls import path, re_path, include
from django.views.static import serve
from django.views.generic import TemplateView

dist_dir = settings.FRONTEND_DIST_DIR

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('college_app.urls')),
    # Serve assets from frontend dist
    re_path(r'^assets/(?P<path>.*)$', serve, {'document_root': os.path.join(dist_dir, 'assets')}),
    # Serve favicon & images at root
    re_path(r'^(?P<path>favicon\.svg|.*\.jpg|.*\.png)$', serve, {'document_root': os.path.join(dist_dir, 'assets')}),
    # Catch-all route to serve React Single Page Application (SPA)
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]
