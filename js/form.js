const validateForm = (form, messageBox) =>
{
    if (form["firstName"].value === "")
    {
        $("#" + messageBox).html("First name must be entered!");
        return false;
    }

    if (form["lastName"].value === "")
    {
        $("#" + messageBox).html("Last name must be entered!");
        return false;
    }

    if (form["class"].value == "")
    {
        $("#" + messageBox).html("Class must be selected from list!");
        return false;
    }

    if (form["gender"].value == "")
    {
        $("#" + messageBox).html("Gender must be selected!");
        return false;
    }

    if (form["nationality"].value == "")
    {
        $("#" + messageBox).html("Nationality must be selected from list!");
        return false;
    }
/*
    if (form["address"].value == "")
    {
        $("#" + messageBox).html("Address must be entered!");
        return false;
    }
*/
    if (form["telephone"].value.length < 9)
    {
        $("#" + messageBox).html("A valid phone number must be entered!");
        return false;
    }

    let choices =
        [
            form["tripCataluna"].value,
            form["tripBanyuls"].value,
            form["tripElba"].value,
            form["tripFuerteventura"].value,
            form["tripKalymnos"].value,
            form["tripIreland"].value,
            form["tripMallorca"].value,
            form["tripTenerife"].value,
        ];

    const luxembourgSelected  = form["tripLuxembourg"].value !== "0";

    if (luxembourgSelected)
    {
        const luxembourgNotTen = form["tripLuxembourg"].value !== "10";

        if (luxembourgNotTen)
        {
            $("#" + messageBox).html("Luxembourg can only be chosen with 10!");
            return false;
        }

        else
        {
            let otherTripSelected = false;

            for (let i = 0, len = choices.length; i < len && !otherTripSelected; ++i)
            {
                if (choices[i] !== "0")
                    otherTripSelected = true;
            }

            if (otherTripSelected)
            {
                $("#" + messageBox).html("Only Luxembourg OR the other trips may be selected!");
                return false;
            }
        }
    }

    else
    {
        let tripRated10 = false;

        for (let i = 0, len = choices.length; i < len && !tripRated10; ++i)
        {
            if (choices[i] === "10")
                tripRated10 = true;
        }

        if (!tripRated10)
        {
            $("#" + messageBox).html("At least one trip must be rated 10!");
            return false;
        }

        choices.sort();
        let duplicateValues = false;

        for (let i = 0, len = choices.length; i < len - 1 && !duplicateValues; ++i)
        {
            if (choices[i] !== "0" && choices[i + 1] === choices[i])
                duplicateValues = true;
        }

        if (duplicateValues)
        {
            $("#" + messageBox).html("All trips must have unique values!");
            return false;
        }
    }

    return true;
};

const getFormDataObject = (form) =>
{
    let serialized = $(form).serializeArray(), obj = {};

    // build key-values
    $.each (serialized, function()
    {
        obj[this.name] = this.value;
    });

    return obj;
};

const submitForm = () =>
{
    const form = document.forms["personForm"];
    const messageBox = "formMessageBox";

    if (!validateForm(form, messageBox))
        return false;

    const data = getFormDataObject(form);

    if (data === {})
    {
        $("#" + messageBox).html("Received empty form data!");
        return false;
    }

    addPerson(data);

    $("#" + messageBox).html("Successfully added person to list!");
    form.reset();
    refreshRangeSliders();
    return true;
};

// Save currently entered form data into session storage
const saveTemplate = () =>
{
    const form = document.forms["personForm"];
    const messageBox = "formMessageBox";
    const data = getFormDataObject(form);
    const dataString = JSON.stringify(data);
    Storages.sessionStorage.set("template", dataString);
    $("#" + messageBox).html("Successfully saved form template!");
};

// Load form data (if any) from previously saved session storage
const loadTemplate = () =>
{
    const data = Storages.sessionStorage.get("template");
    $("#personForm").populate(data, "name");
    refreshRangeSliders();
};
