function ran_col() {
	var color;
	var letters = ['CC3232','FF8600','859C27','F2AE72','588C7E','551A8B','8B0A50'];
	var x= document.getElementsByClassName("todo-task");
	var i;
	for(i=0;i<x.length;i++)
	{
		color="#";
		color += letters[Math.floor(Math.random() * letters.length)];
		x[i].style.backgroundColor = color;
	}
}