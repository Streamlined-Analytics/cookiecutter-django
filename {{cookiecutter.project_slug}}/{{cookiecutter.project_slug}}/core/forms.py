"""
This file is an example of how to create use htmx to add rows to the formset dynamically.
We create the base form, then create the formset, then use the formsethelper
to style the formset (e.g. making it all a row, with a button to add more rows).
We then use the create_new_form function to create a new formset with the new formset number.
The partial uses htmx oob-swaps to swap in the formset information,
and normal htmx to add in the new row.
"""

from django.forms import formset_factory
from django import forms
from crispy_forms.helper import FormHelper
from bs4 import BeautifulSoup
from render_block import render_block_to_string
from django.utils.safestring import mark_safe
from django.shortcuts import render



class BaseForm(forms.Form):
    pass


BaseFormSet = formset_factory(BaseForm, extra=1)


class BaseFormSetHelper(FormHelper):
    pass

def create_new_form(new_total_formsets):
    formset = BaseFormSet(prefix=f"form-{new_total_formsets}")
    helper = BaseFormSetHelper()
    context = {
        "formset": formset,
        "helper": helper,
    }
    html = render_block_to_string("documents/quotes.html", "formset_helper", context)
    soup = BeautifulSoup(html, "html.parser")

    formset_div = soup.find("div", {"class": "formset"})

    formset_div = str(formset_div)

    # Because django always prefixes the formset with form-
    formset_div = formset_div.replace(
        f"div_id_form-{new_total_formsets}-0", f"div_id_form-{new_total_formsets}"
    )
    formset_div = formset_div.replace(
        f"id_form-{new_total_formsets}-0", f"id_form-{new_total_formsets}"
    )
    formset_div = formset_div.replace(
        f"form-{new_total_formsets}-0", f"form-{new_total_formsets}"
    )
    # replace hx-include and hx-trigger with the new formset number
    formset_div = formset_div.replace(
        "form-0-line_option",
        f"form-{new_total_formsets}-line_option",
    )
    context = {
        "formset": mark_safe(str(formset_div)),
        "new_total_formsets": new_total_formsets + 1,
        "htmx_mode": True,
    }
    return render(request, "falcon/formset_partial.html", context)
