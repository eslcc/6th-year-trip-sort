class Group
{
    constructor(person)
    {
        this.list = [person];
        this.people = 1;
    }

    getFirstPerson()
    {
        return this.list[0];
    }

    mergeGroup(rhs)
    {
        this.people += rhs.people;

        for (let i = 0; i < rhs.people; ++i)
            this.list.push(rhs.list[i]);
    }

    render()
    {
        let html = "<ul>";

        for (let i = 0; i < this.people; ++i)
        {
            const person = this.list[i];
            html += "<li>" + person.firstName + " " + person.lastName + "</li>";
        }

        html += "</ul>";
        return html;
    }
}

class TripData
{
    constructor(statsBox, listBox)
    {
        this.list = [];
        this.statsBox = statsBox;
        this.listBox = listBox;
        this.people = 0;
        this.boys = 0;
        this.girls = 0;
        this.english = 0;
        this.polish = 0;
        this.french = 0;
        this.german = 0;
        this.dutch = 0;
        this.finnish = 0;
        this.swedish = 0;
        this.portuguese = 0;
        this.spanish = 0;
    }

    addGroup(person)
    {
        this.list.push(new Group(person));
        this.people++;

        if (person.gender === "male")
            this.boys++;

        else if (person.gender === "female")
            this.girls++;

        switch (person.class)
        {
            case "6ENA":
            case "6ENB":
                this.english++;
                break;

            case "6PLA":
                this.polish++;
                break;

            case "6FRA":
            case "6FRB":
                this.french++;
                break;

            case "6DEA":
                this.german++;
                break;

            case "6NLA":
                this.dutch++;
                break;

            case "6FIA":
                this.finnish++;
                break;

            case "6SWA":
                this.swedish++;
                break;

            case "6PTA":
                this.portuguese++;
                break;

            case "6ESA":
                this.spanish++;
                break;
        }
    }

    mergeGroups(index1, index2)
    {
        this.list[index1].mergeGroup(this.list[index2]);
        this.list.splice(index2, 1);
    }

    findPerson(fullName, estimate)
    {
        let found = -1;
        let len = this.list.length;

        for (let i = estimate; i < len && found === -1; ++i)
        {
            const person = this.list[i].getFirstPerson();

            if (fullName === person.firstName + " " + person.lastName)
                found = i;
        }

        if (found === -1 && estimate !== 0)
            found = this.findPerson(fullName, 0);

        return found;
    }

    renderStats()
    {
        let html = "<li>Total people: " + this.people + "</li>" +
                   "<li>Boys: "         + this.boys   + "</li>" +
                   "<li>Girls: "        + this.girls  + "</li>";

        if (this.english != 0)
            html += "<li>English: " + this.english + "</li>";

        if (this.polish != 0)
            html += "<li>Polish: " + this.polish + "</li>";

        if (this.french != 0)
            html += "<li>French: " + this.french + "</li>";

        if (this.german != 0)
            html += "<li>German: " + this.german + "</li>";

        if (this.dutch != 0)
            html += "<li>Dutch: " + this.dutch + "</li>";

        if (this.finnish != 0)
            html += "<li>Finnish: " + this.finnish + "</li>";

        if (this.swedish != 0)
            html += "<li>Swedish: " + this.swedish + "</li>";

        if (this.portuguese != 0)
            html += "<li>Portuguese: " + this.portuguese + "</li>";

        if (this.spanish != 0)
            html += "<li>Spanish: " + this.spanish + "</li>";

        return html;
    }

    renderList()
    {
        let html = "";

        for (let i = 0; i < this.list.length; ++i)
        {
            html += this.list[i].render();
            html += "<hr>";
        }

        return html;
    }

    displayData()
    {
        $(this.statsBox).html(this.renderStats());
        $(this.listBox).html(this.renderList());
    }
}

const TripSort =
{
    boys:  0,
    girls: 0,
    Cataluna:      new TripData("#tripCatalunaStatistics", "#tripCataluna"),
    Banyuls:       new TripData("#tripBanyulsStatistics", "#tripBanyuls"),
    Elba:          new TripData("#tripElbaStatistics", "#tripElba"),
    Fuerteventura: new TripData("#tripFuerteventuraStatistics", "#tripFuerteventura"),
    Kalymnos:      new TripData("#tripKalymnosStatistics", "#tripKalymnos"),
    Ireland:       new TripData("#tripIrelandStatistics", "#tripIreland"),
    Mallorca:      new TripData("#tripMallorcaStatistics", "#tripMallorca"),
    Tenerife:      new TripData("#tripTenerifeStatistics", "#tripTenerife"),
    Luxembourg:    new TripData("#tripLuxembourgStatistics", "#tripLuxembourg"),

    displayAllData()
    {
        const statistics = "<ul><li>Total people: " + PEOPLE.length + "</li>" +
                           "<li>Boys: "             + this.boys     + "</li>" +
                           "<li>Girls: "            + this.girls + "</li></ul>";
        $("#tripMessageBox").html(statistics);

        this.Cataluna.displayData();
        this.Banyuls.displayData();
        this.Elba.displayData();
        this.Fuerteventura.displayData();
        this.Kalymnos.displayData();
        this.Ireland.displayData();
        this.Mallorca.displayData();
        this.Tenerife.displayData();
        this.Luxembourg.displayData();
    },

    performForAll(action, params)
    {
        action(this.Cataluna, params);
        action(this.Banyuls, params);
        action(this.Elba, params);
        action(this.Fuerteventura, params);
        action(this.Kalymnos, params);
        action(this.Ireland, params);
        action(this.Mallorca, params);
        action(this.Tenerife, params);
        action(this.Luxembourg, params);
    },

    gcd(a, b)
    {
        return (b ? this.gcd(b, a % b) : a);
    },

    initialSort()
    {
        if (!validatePartners())
        {
            $("#tripMessageBox").html("Partners failed to validate, check all people list for details");
            return false;
        }

        for (let i = 0, len = PEOPLE.length; i < len; ++i)
        {
            const person = PEOPLE[i];

            if (person.gender === "male")
                this.boys++;

            else if (person.gender === "female")
                this.girls++;

            if (person.tripCataluna === "10")
                this.Cataluna.addGroup(person);

            else if (person.tripBanyuls === "10")
                this.Banyuls.addGroup(person);

            else if (person.tripElba === "10")
                this.Elba.addGroup(person);

            else if (person.tripFuerteventura === "10")
                this.Fuerteventura.addGroup(person);

            else if (person.tripKalymnos === "10")
                this.Kalymnos.addGroup(person);

            else if (person.tripIreland === "10")
                this.Ireland.addGroup(person);

            else if (person.tripMallorca === "10")
                this.Mallorca.addGroup(person);

            else if (person.tripTenerife === "10")
                this.Tenerife.addGroup(person);

            else if (person.tripLuxembourg === "10")
                this.Luxembourg.addGroup(person);

            else
            {
                $("#tripMessageBox").html("WTF: " + person.firstName + " " + person.lastName + " had no trip rated 10");
                return false;
            }
        }

        this.displayAllData();
        return true;
    },
/*
    moveGroupToBack(list, index)
    {
        let groupSize = 1;

        if (list[index].lineBreak === false)
        {
            ++groupSize;

            if (list[index + 1].lineBreak === false)
                ++groupSize;
        }

        console.log("Moving group of " + list[index].firstName + " with " + groupSize + " people to back.");

        list.splice(list.length, 0, list.splice(index, groupSize)[0]);
    },

    moveGroupToTrip(list1, index, list2)
    {
        let groupSize = 1;

        if (list1[index].lineBreak === false)
        {
            ++groupSize;

            if (list1[index + 1].lineBreak === false)
                ++groupSize;
        }

        console.log("Moving group of " + list1[index].firstName + " with " + groupSize + " people to another trip.");

        for (let i = index; i < index + groupSize; ++i)
            list2.push(list1[i]);

        console.log("check this out" + list1.splice(index, groupSize));
    },
*/
    groupPartnersStep(trip)
    {
        for (let i = 0; i < trip.list.length; ++i)
        {
            const person = trip.list[i].getFirstPerson();

            if (person.partner1 === "")
                continue;

            let found = trip.findPerson(person.partner1, i);

            if (found === -1)
            {
                console.warn("could not find partner1!!");
                continue;
            }

            if (found !== i + 1)
            {
                console.log("moving " + found + " " + trip.list[found].getFirstPerson().firstName + " next to " + i + " " + person.firstName);
                trip.mergeGroups(i, found);
            }

            if (person.partner2 === "")
                continue;

            found = trip.findPerson(person.partner2, i);

            if (found === -1)
            {
                console.warn("could not find partner2!!");
                continue;
            }

            if (found !== i + 1)
            {
                console.log("moving " + found + " " + trip.list[found].getFirstPerson().firstName + " next to " + i + " " + person.firstName);
                trip.mergeGroups(i, found);
            }
        }
    },

    groupPartners()
    {
        this.performForAll(this.groupPartnersStep);
        this.displayAllData();
    },
/*
    overflowStep(trip)
    {
        if (trip.people > 30)
        {
            while (trip.people > 30)
            {

            }
        }
    },
    */
/*
    genderMixStep(trip, genderRatio)
    {
        const tripGCD = this.gcd(trip.boys, trip.girls);
        const tripRatio = [trip.boys / tripGCD, trip.girls / tripGCD];
        const ratioDifference = genderRatio - tripRatio;
        console.log(ratioDifference);
        let ongoingRatio = [0, 0];

        for (let i = 0, len = trip.list.length; i < len; ++i)
        {
            const person = trip.list[i];

            if (person.gender === "male")
                ++ongoingRatio[0];

            else if (person.gender === "female")
                ++ongoingRatio[1];

            if (ongoingRatio[0] > ongoingRatio[1] + ratioDifference && person.gender === "male")
                this.moveGroupToBack(trip.list, i);

            else if (ongoingRatio + ratioDifference < ongoingRatio[1] && person.gender === "female")
                this.moveGroupToBack(trip.list, i);
        }
    },

    genderMix()
    {
        const genderGCD = this.gcd(this.boys, this.girls);
        const genderRatio = [this.boys / genderGCD, this.girls / genderGCD];
        console.log("Gender ratio: " + genderRatio);

        this.performForAll(this.genderMixSte, genderRatio);
        this.displayAllData();
    },
    */
};
