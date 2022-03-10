jQuery(document).ready(function () {

    if (pmpropp_plans.stored_plans !== "") {
        jQuery("#accordion").append(pmpropp_plans.stored_plans);
        initializeAccordion();
    }

    // Load each checkbox on page load, for pre-saved data. 
    jQuery.each(pmpropp_plans.plan_data, function (key, val) {

        // Show recurring settings by default.
        if (val.cycle_number) {
            jQuery("#pmpropp_plan_" + key + " #pmpropp_recurring").prop('checked', true); //set it to checked.
        }

        // Show trial by default.
        if (val.trial_limit) {
            jQuery("#pmpropp_plan_" + key + " #pmpropp_custom_trial").prop('checked', true); //set it to checked.
        }

        // Set the expiration checkbox to set if data is found.
        if (val.expiration_number) {
            jQuery("#pmpropp_plan_" + key + " #pmpropp_plan_expiration").prop('checked', true); //set it to checked.
        }
    });


    var payment_plan_added = 0;

    // Functionality to create the payment plan.
    jQuery("body").on("click", "#pmpropp_add_payment_plan", function (e) {

        e.preventDefault();

        if (pmpropp_plans.stored_plans !== "" || payment_plan_added !== 0) {
            jQuery('#accordion').accordion('destroy');
        }

        payment_plan_added++;

        jQuery("#accordion").append(pmpropp_plans.template);

        jQuery(function () { initializeAccordion() });

        return false;

    });

    // Order the accordion.
    jQuery("body").on("click", ".s_panel", function () {

        var id = jQuery(this).attr('id');
        var menu_order = jQuery(this).attr('menu_order');
        jQuery('#' + id + ' #pmpropp_display_order').val(menu_order);

        jQuery('#' + id + ' #pmpropp_recurring').attr('menu_order', menu_order);
        jQuery('#' + id + ' #pmpropp_plan_expiration').attr('menu_order', menu_order);

        jQuery('#' + id + ' tr.pmpropp_plan_expiration_info').addClass('pmpropp_expirations_' + menu_order);
        jQuery('#' + id + ' tr.pmpropp_plan_recurring').addClass('pmpropp_recurring_' + menu_order);
        jQuery('#' + id + ' .pmpropp_trial_info').addClass('pmpropp_trial_info_' + menu_order);

        // Show the pmpropp_recurring_x field if the checkbox is pre-selected previously.
        if (jQuery('#pmpropp_plan_' + menu_order + ' #pmpropp_recurring').prop('checked')) {
            jQuery('.pmpropp_plan_recurring.pmpropp_recurring_' + menu_order).show();
        }

        // Show the custom trial depending fields.
        if (jQuery('#pmpropp_plan_' + menu_order + ' #pmpropp_custom_trial').prop('checked')) {
            jQuery('.pmpropp_trial_info_' + menu_order).show();
        }

        if (jQuery('#pmpropp_plan_' + menu_order + ' #pmpropp_plan_expiration').prop('checked')) {
            jQuery('.pmpropp_expirations_' + menu_order).show();
        }




    });

    /**
     * Show the items that depend on recurring billing checkbox.
     */
    jQuery("body").on("click", "#pmpropp_recurring", function () {

        var menu_order = jQuery(this).attr('menu_order');

        if (jQuery(this).is(':checked')) {
            jQuery(".pmpropp_recurring_" + menu_order).show();
        } else {
            jQuery(".pmpropp_recurring_" + menu_order).hide();
        }

    });

    jQuery("body").on("click", "#pmpropp_plan_expiration", function () {
        console.log('clicked');

        var menu_order = jQuery(this).attr('menu_order');

        if (jQuery(this).is(':checked')) {
            jQuery(".pmpropp_expirations_" + menu_order).show();
        } else {
            jQuery(".pmpropp_expirations_" + menu_order).hide();
        }

    });

    jQuery("body").on("click", ".pmpropp_remove_plan", function () {

        var parent = jQuery(this).parent().parent().attr('id');
        jQuery("#" + parent).remove();

    });
});

/**
 * Initialize the accordions if data already exists.
 * Runs on page load.
 */
function initializeAccordion() {



    jQuery('#accordion').accordion({
        collapsible: true,
        active: false,
        heightStyle: 'content',
        header: 'h3'
    }).sortable({
        items: '.s_panel',
        update: function (event, ui) {
            var counter = 0;
            jQuery('.s_panel').each(function (key, val) {
                jQuery(this).attr('menu_order', counter)
                jQuery(this).attr('id', 'pmpropp_plan_' + counter);
                counter++;
            });
        }
    });

    jQuery('#accordion').on('accordionactivate', function (event, ui) {
        if (ui.newPanel.length) {
            jQuery('#accordion').sortable('disable');
        } else {
            jQuery('#accordion').sortable('enable');
        }
    });

    var counter = 0;

    jQuery(".s_panel").each(function (key, val) {
        jQuery(this).attr('menu_order', counter)
        jQuery(this).attr('id', 'pmpropp_plan_' + counter);
        counter++;
    });

}
