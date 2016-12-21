let PEOPLE = [];

const addPerson = (data) =>
{
    data.lineBreak = false;
    PEOPLE.push(data);
};

const locatePartner = (partnerName) =>
{
    let found = -1;

    for (let i = 0, len = PEOPLE.length; i < len && found === -1; ++i)
    {
        if (PEOPLE[i].firstName + " " + PEOPLE[i].lastName === partnerName)
            found = i;
    }

    return found;
};

const checkNamesMutuality = (person, partner) =>
{
    return (partner.partner1 === person.firstName + " " + person.lastName) ||
           (partner.partner2 === person.firstName + " " + person.lastName);
};

const checkChoicesMutuality = (person, partner) =>
{
    return (person.tripLuxembourg === partner.tripLuxembourg &&
            person.tripCataluna === partner.tripCataluna &&
            person.tripBanyuls === partner.tripBanyuls &&
            person.tripElba === partner.tripElba &&
            person.tripFuerteventura === partner.tripFuerteventura &&
            person.tripKalymnos === partner.tripKalymnos &&
            person.tripIreland === partner.tripIreland &&
            person.tripMallorca === partner.tripMallorca &&
            person.tripTenerife === partner.tripTenerife);
};

const setRowColour = (row, colour) =>
{
    $(row).css("background", colour);
};

const checkPartner = (index, row, person, partnerName) =>
{
    if (partnerName === "")
    {
        console.log(index + ": no partner");
        setRowColour(row, "lightblue");
        return true;
    }

    const found = locatePartner(partnerName);

    if (found === -1)
    {
        console.log(index + ": partner not found");
        setRowColour(row, "red");
        return false;
    }

    const partner = PEOPLE[found];

    if (!checkNamesMutuality(person, partner))
    {
        console.log(index + ": non mutual partners");
        setRowColour(row, "crimson");
        return false;
    }

    if (!checkChoicesMutuality(person, partner))
    {
        console.log(index + ": not same choices");
        setRowColour(row, "orange");
        return false;
    }

    console.log(index + ": everything ok");
    setRowColour(row, "lightgreen");
    return true;
};

const validatePartners = () =>
{
    let rows = $("#listTable > tbody > tr");
    let valid = true;

    for (let i = 0, len = PEOPLE.length; i < len; ++i)
    {
        valid = checkPartner(i, rows[i], PEOPLE[i], PEOPLE[i].partner1);

        if (valid && PEOPLE[i].partner2 !== "")
            valid = checkPartner(i, rows[i], PEOPLE[i], PEOPLE[i].partner2);
    }

    return valid;
};

let currentPerson = -1;

const openEditDialog = (index) =>
{
    $("#editDialog").css("display", "block");
    //path[0] is the td element clicked
    //path[1] is the tr element clicked
    //each tr has 4 cells
    //the first one contains the person's ID
    //currentPerson = $(evt.path[1].cells[0]).html();
    currentPerson = index;
    $("#personDetails").populate(PEOPLE[currentPerson], "name");
    refreshRangeSliders();
};

const closeEditDialog = () =>
{
    $("#editMessageBox").empty();
    $("#editDialog").css("display", "none");
    $("#partnerDetails").css("display", "none");
    currentPerson = -1;
};

const findPartnerDetails = (which) =>
{
    $("#editMessageBox").css("display", "block");

    let partnerName;

    if (which === 1)
        partnerName = $("#partnerName1").val();

    else
        partnerName = $("#partnerName2").val();

    if (partnerName === "")
    {
        $("#editMessageBox").html("No partner name entered!");
        return false;
    }

    let found = -1;

    for (let i = 0, len = PEOPLE.length; i < len && found === -1; ++i)
    {
        if (PEOPLE[i].firstName + " " + PEOPLE[i].lastName === partnerName)
            found = i;
    }

    if (found === -1)
    {
        $("#editMessageBox").html("No such named person found!");
        return false;
    }

    $("#partnerDetails").populate(PEOPLE[found], "name");
    $("#partnerDetails").css("display", "inline-block");
    $("#editMessageBox").css("display", "none");

    return true;
};

const switchForm = () =>
{
    if ($("#personTab1").hasClass("active"))
    {
        $("#personTab1").removeClass("active");
        $("#personTab2").addClass("active");
        $("#person1").css("display", "none");
        $("#person2").css("display", "initial");
        refreshRangeSliders();
    }

    else
    {
        $("#personTab2").removeClass("active");
        $("#personTab1").addClass("active");
        $("#person2").css("display", "none");
        $("#person1").css("display", "initial");
    }

    if ($("#partnerTab1").hasClass("active"))
    {
        $("#partnerTab1").removeClass("active");
        $("#partnerTab2").addClass("active");
        $("#partner1").css("display", "none");
        $("#partner2").css("display", "initial");
        refreshRangeSliders();
    }

    else
    {
        $("#partnerTab2").removeClass("active");
        $("#partnerTab1").addClass("active");
        $("#partner2").css("display", "none");
        $("#partner1").css("display", "initial");
    }
};

const populateTable = () =>
{
    let table = $("#listTable > tbody");
    table.empty();
    let html = "";

    for (let i = 0, len = PEOPLE.length; i < len; ++i)
    {
        html += "<tr><td>" + i + "</td>" +
            "<td>" + PEOPLE[i].firstName + "</td>" +
            "<td>" + PEOPLE[i].lastName + "</td>" +
            "<td>" + PEOPLE[i].class + "</td></tr>";
    }

    table.html(html);

    table.on("click", "tr", function(e)
    {
        openEditDialog($(e.currentTarget).index());
    });
};

const savePerson = () =>
{
    $("#partnerDetails").css("display", "none");
    const form = document.forms["personDetails"];
    const messageBox = "editMessageBox";
    $("#" + messageBox).css("display", "block");

    if (!validateForm(form, messageBox))
        return false;

    const data = getFormDataObject(form);

    if (data === {})
    {
        $("#" + messageBox).html("Received empty form data!");
        return false;
    }

    PEOPLE[currentPerson] = data;
    $("#" + messageBox).html("Saved successfully!");
    closeEditDialog();
    populateTable();
    return true;
};

const deletePerson = () =>
{
    const sure = confirm("Are you super duper sure?");

    if (sure)
    {
        PEOPLE.splice(currentPerson, 1);
        closeEditDialog();
        populateTable();
    }
};
