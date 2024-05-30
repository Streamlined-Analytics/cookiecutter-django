from config.settings.base import company_name

def business_name(request):
    return {"business_name": company_name}
