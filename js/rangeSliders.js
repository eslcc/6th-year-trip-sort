const rangeSlider = () =>
{
    let slider = $(".tripSlider");
    let range = $(".tripSliderRange");
    let value = $(".tripSliderValue");

    slider.each(function()
    {
        value.each(function()
        {
            let value = $(this).prev().attr("value");
            $(this).html(value);
        });

        range.on("input", function()
        {
            $(this).next(value).html(this.value);
        });
    });
};

const refreshRangeSliders = () =>
{
    let slider = $(".tripSlider");
    let range = $(".tripSliderRange");
    let value = $(".tripSliderValue");

    slider.each(function()
    {
        range.each(function()
        {
            $(this).next(value).html(this.value);
        });
    });
};

//Run function when DOM is ready
$(rangeSlider());
