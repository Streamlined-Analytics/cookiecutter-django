"""
This file has two things.
1) A formview that uses htmx to submit the form and close the modal.

2) Is an example of how to create use htmx to add rows to the formset dynamically.
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

from django.views.generic.edit import FormView
from django.http import HttpResponse
from django_htmx.http import retarget
from render_block import render_block_to_string



# 1) FormView that uses htmx to submit the form and close the modal.
class BaseFormView(FormView):
    template_name = "falcon/form-modal.html"

    def form_valid(self, form):
        form.save()
        return HttpResponse("<script>closeModal();</script>")

    def form_invalid(self, form):
        html = render_block_to_string(
            self.template_name,
            "form",
            {
                "form": form,
                "htmx_mode": True
            },
        )
        resp = HttpResponse(html)
        return retarget(resp, "#form-container")

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["htmx_mode"] = True
        context["normal"] = True
        context['action_url'] = self.request.path
        return context


# 2) Example of how to use htmx to add rows to a formset dynamically.

class BaseFormSetForm(forms.Form):
    pass


BaseFormSet = formset_factory(BaseFormSetForm, extra=1)


class BaseFormSetHelper(FormHelper):
    pass

def create_new_form(request, new_total_formsets):
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
        "formset": mark_safe(str(formset_div)),  # noqa: S308
        "new_total_formsets": new_total_formsets + 1,
        "htmx_mode": True,
    }
    return render(request, "falcon/formset_partial.html", context)
