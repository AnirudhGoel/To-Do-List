var todo = todo || {},
    data = JSON.parse(localStorage.getItem("todoData"));

data = data || {};

(function(todo, data, $) {

    // Initialising Elements
    var defaults = {
            todoTask: "todo-task",
            todoHeader: "task-header",
            taskId: "task-",
            formId: "todo-form",
            dataAttribute: "data",
            deleteDiv: "delete-div"
        }, codes = {
            "1" : "#pending",
            "2" : "#completed"
        };

    todo.init = function (options) {

        options = options || {};
        options = $.extend({}, defaults, options);

        $.each(data, function (index, params) {
            generateElement(params);
        });


        // Add drop function to each task
        $.each(codes, function (index, value) {
            $(value).droppable({
                drop: function (event, ui) {
                        var element = ui.helper,
                            css_id = element.attr("id"),
                            id = css_id.replace(options.taskId, ""),
                            object = data[id];

                            // Removing old element
                            removeElement(object);

                            // Changing object code
                            object.code = index;

                            // Generating new element
                            generateElement(object);

                            // Updating Local Storage
                            data[id] = object;
                            localStorage.setItem("todoData", JSON.stringify(data));

                            // Refreshing page so that all attributes refresh accroding to new location
                            window.location.reload();
                    }
            });
        });
    };

    // Add Task
    var generateElement = function(params){
        var parent = $(codes[params.code]),
            wrapper;

        if (!parent) {
            return;
        }

        wrapper = $("<div />", {
            "class" : defaults.todoTask,
            "id" : defaults.taskId + params.id,
            "data" : params.id
        }).appendTo(parent);

        $("<div />", {
            "class" : "close",
            "text": "x"
        }).appendTo(wrapper);

        $("<div />", {
            "class" : defaults.todoHeader,
            "text": params.title
        }).appendTo(wrapper);

        wrapper.draggable({
            revert: "invalid",
            revertDuration : 200
        });
    };

    //Delete on clicking x
    $('document').ready(function(){
        $(document.getElementsByClassName("close")).click(function(){

            var id = $(this).parent().attr('id'),
                parent = $(this).parent();

            id = id.replace("task-","");
            console.log(id);
            // Removing old element
            $("#" + id).remove();

            // Updating local storage
            delete data[id];
            localStorage.setItem("todoData", JSON.stringify(data));


            parent.slideUp('slow', function() {$(this).remove();});
        });
    });



    // Remove task
    var removeElement = function (params) {
        $("#" + defaults.taskId + params.id).remove();
    };

    todo.add = function() {
        var inputs = $("#" + defaults.formId + " :input"),
            errorMessage = "Please Enter a Task",
            id, title, tempData;

        title = inputs[0].value;


        if (!title) {
            window.alert(errorMessage);
            return;
        }

        id = new Date().getTime();

        tempData = {
            id : id,
            code: "1",
            title: title,
        };

        // Saving element in local storage
        data[id] = tempData;
        localStorage.setItem("todoData", JSON.stringify(data));

        // Generate Todo Element
        generateElement(tempData);

        // Reset Form
        inputs[0].value = "";
    };


    todo.clear = function () {
        data = {};
        localStorage.setItem("todoData", JSON.stringify(data));
        $("." + defaults.todoTask).remove();
    };

})(todo, data, jQuery);